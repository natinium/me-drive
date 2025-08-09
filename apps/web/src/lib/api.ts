import type {
  RegisterPayload,
  AuthResponse,
  LoginPayload,
} from "@/types/auth.types";

/**
 * Makes a POST request to the backend's /auth/login endpoint.
 * @param data The user login credentials (email and password).
 * @returns The authentication response from the backend.
 * @throws An error if the login fails.
 */
export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
  const response = await fetch("http://localhost:3001/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

/**
 * Makes a POST request to the backend's /auth/register endpoint.
 * @param data The user registration data.
 * @returns The API response containing the new user and tokens.
 * @throws An error if the registration fails.
 */
export async function registerUser(
  data: RegisterPayload,
): Promise<AuthResponse> {
  const response = await fetch("http://localhost:3001/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
}
