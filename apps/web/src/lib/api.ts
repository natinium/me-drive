/**
 * Production-ready API layer (drop-in replacement)
 * Zero external dependencies – only uses native fetch & AbortController
 */

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: { id: string; email: string; name?: string };
  accessToken: string;
  refreshToken?: string;
}

export interface DashboardStatsResponse {
  totalFiles: number;
  totalFolders: number;
  storageUsed: number;
  storageLimit: number;
  recentFiles: any[];
}

export interface CreateFolderBody {
  name: string;
  parentId?: string | null;
}

export interface ListFilesQuery {
  folderId?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// -----------------------------------------------------------------------------
// CONFIG
// -----------------------------------------------------------------------------
const API_URL = (() => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return "http://localhost:3001";
  try {
    new URL(url);
    return url.replace(/\/+$/, "");
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_API_URL: ${url}`);
  }
})();

// -----------------------------------------------------------------------------
// ERROR HANDLING
// -----------------------------------------------------------------------------
export class ApiError extends Error {
  constructor(
    public status: number,
    public body: any,
    message?: string,
  ) {
    super(message ?? `HTTP ${status}`);
  }
}

// -----------------------------------------------------------------------------
// HTTP CLIENT
// -----------------------------------------------------------------------------
const DEFAULT_TIMEOUT = 10_000;
const MAX_RETRIES = 1;

class HttpClient {
  private controllerMap = new Map<string, AbortController>();

  private async _fetch(
    path: string,
    init: RequestInit & { retries?: number; timeout?: number } = {},
  ): Promise<Response> {
    const {
      retries = MAX_RETRIES,
      timeout = DEFAULT_TIMEOUT,
      ...reqInit
    } = init;

    const key = `${reqInit.method ?? "GET"}:${path}`;
    if (reqInit.method === "GET" || !reqInit.method) {
      this.controllerMap.get(key)?.abort();
    }
    const controller = new AbortController();
    this.controllerMap.set(key, controller);

    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      console.log("API Request:", {
        url: `${API_URL}${path}`,
        method: reqInit.method,
        headers: reqInit.headers,
      });
      const res = await fetch(`${API_URL}${path}`, {
        ...reqInit,
        signal: controller.signal,
      });
      clearTimeout(timer);
      this.controllerMap.delete(key);

      if (!res.ok) {
        let body: any;
        try {
          body = await res.json();
        } catch {
          body = null;
        }
        throw new ApiError(res.status, body, body?.message || res.statusText);
      }
      return res;
    } catch (err: any) {
      clearTimeout(timer);
      this.controllerMap.delete(key);
      console.error("API Request Error:", {
        url: `${API_URL}${path}`,
        method: reqInit.method,
        error: err,
      });

      if (err.name === "AbortError" && retries > 0) {
        return this._fetch(path, { ...init, retries: retries - 1 });
      }
      throw err;
    }
  }

  /* Public raw fetch (for blob, etc.) */
  async fetch(path: string, init?: RequestInit): Promise<Response> {
    return this._fetch(path, init);
  }

  /* JSON helpers */
  async get<T>(path: string, token?: string): Promise<T> {
    const res = await this._fetch(path, {
      method: "GET", // Explicitly set method to GET
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.json();
  }

  async post<T>(
    path: string,
    payload?: any,
    token?: string,
    contentType = "application/json",
  ): Promise<T> {
    const init: RequestInit = {
      method: "POST",
      body:
        contentType === "application/json" ? JSON.stringify(payload) : payload,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    };
    if (contentType !== "multipart/form-data") {
      init.headers = { ...init.headers, "Content-Type": contentType };
    }
    const res = await this._fetch(path, init);
    return res.json();
  }

  async patch<T>(
    path: string,
    payload: any,
    token: string,
    contentType = "application/json",
  ): Promise<T> {
    const init: RequestInit = {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await this._fetch(path, init);
    return res.json();
  }

  async delete(path: string, token: string): Promise<void> {
    await this._fetch(path, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /* File helpers */
  async upload<T>(path: string, form: FormData, token: string): Promise<T> {
    const res = await this._fetch(path, {
      method: "POST",
      body: form,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  }
}

const http = new HttpClient();

// -----------------------------------------------------------------------------
// AUTH
// -----------------------------------------------------------------------------
export const loginUser = (data: LoginCredentials): Promise<AuthResponse> =>
  http.post("/auth/login", data);

export const registerUser = (
  data: RegisterCredentials,
): Promise<AuthResponse> => http.post("/auth/register", data);

// -----------------------------------------------------------------------------
// DASHBOARD
// -----------------------------------------------------------------------------
export const getDashboardStats = (
  token: string,
): Promise<DashboardStatsResponse> => http.get("/dashboard/stats", token);

// -----------------------------------------------------------------------------
// FOLDERS
// -----------------------------------------------------------------------------
export const listFolders = (token: string, parentId?: string) => {
  const url = `/folders?parentId=${encodeURIComponent(parentId ?? "")}`;
  return http.get(url, token);
};

export const createFolder = (token: string, body: CreateFolderBody) =>
  http.post("/folders", body, token);

export const deleteFolder = (token: string, folderId: string) =>
  http.delete(`/folders/${encodeURIComponent(folderId)}`, token);

export const renameFolder = (
  token: string,
  folderId: string,
  newName: string,
) =>
  http.patch(
    `/folders/${encodeURIComponent(folderId)}`,
    { name: newName },
    token,
  );

// -----------------------------------------------------------------------------
// FILES
// -----------------------------------------------------------------------------
export const listFiles = (token: string, q: ListFilesQuery = {}) => {
  const url = new URL("/files", API_URL);
  Object.entries(q).forEach(([k, v]) => {
    if (v != null && v !== "") url.searchParams.set(k, String(v));
  });
  return http.get(url.pathname + url.search, token);
};

export const uploadFile = (
  token: string,
  opts: { file: File; name?: string; folderId?: string | null },
) => {
  const form = new FormData();
  form.append("file", opts.file);
  if (opts.name) form.append("name", opts.name);
  if (opts.folderId) form.append("folderId", opts.folderId);
  return http.upload("/files/upload", form, token);
};

export const deleteFile = (token: string, fileId: string) =>
  http.delete(`/files/${encodeURIComponent(fileId)}`, token);

export const renameFile = (token: string, fileId: string, newName: string) =>
  http.patch(`/files/${encodeURIComponent(fileId)}`, { name: newName }, token);

export const downloadFile = async (
  token: string,
  fileId: string,
  fileName: string,
) => {
  const res = await http.fetch(
    `/files/${encodeURIComponent(fileId)}/download`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

// -----------------------------------------------------------------------------
// BREADCRUMB
// -----------------------------------------------------------------------------
export const getFolderPath = (
  token: string,
  folderId: string,
): Promise<{ name: string; id: string }[]> =>
  http.get(`/folders/${encodeURIComponent(folderId)}/path`, token);
