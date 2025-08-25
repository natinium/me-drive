// Drive Types based on API documentation

import { PaginationInfo, FileMetadata } from "./api.types";

// Base drive item interface matching API structure
export interface BaseDriveItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// File interface matching API response
export interface DriveFile extends BaseDriveItem {
  itemType: "file";
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  folderId: string | null;
  isShared: boolean;
  sharedWith?: string[];
  metadata?: FileMetadata;
}

// Folder interface matching API response
export interface DriveFolder extends BaseDriveItem {
  itemType: "folder";
  parentId: string | null;
  path: string;
  fileCount?: number;
  folderCount?: number;
}

// API Response interfaces
export interface FilesResponse {
  files: DriveFile[];
  pagination: PaginationInfo;
}

export interface FoldersResponse {
  folders: DriveFolder[];
}

// Request interfaces
export interface CreateFolderRequest {
  name: string;
  parentId?: string;
}

export interface UpdateFileRequest {
  name?: string;
  folderId?: string;
}

export interface UpdateFolderRequest {
  name?: string;
  parentId?: string;
}

// Storage statistics
export interface StorageStats {
  used: number;
  total: number;
  percentage: number;
  breakdown?: {
    documents: number;
    images: number;
    videos: number;
    audio: number;
    archives: number;
    others: number;
  };
}

// Recent activity
export interface RecentActivity {
  id: string;
  type: "upload" | "download" | "share" | "delete" | "edit";
  itemName: string;
  itemType: "file" | "folder";
  timestamp: string;
  user?: string;
  action: string;
}

// Dashboard statistics
export interface DashboardStats {
  totalFiles: number;
  totalFolders: number;
  storageUsed: number;
  storageLimit: number;
  recentFiles: DriveFile[];
}

// Search parameters for file/folder queries
export interface DriveSearchParams {
  folderId?: string;
  parentId?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "size" | "modifiedAt" | "createdAt";
  sortOrder?: "asc" | "desc";
  includeFiles?: boolean;
}

// File sharing interfaces
export interface ShareFileRequest {
  type: "user" | "public";
  emails?: string[]; // Required for type: user
  permission: "read" | "write";
  expiresAt?: string;
}

export interface SharedFileResponse {
  file: {
    id: string;
    name: string;
    url: string;
  };
  sharedBy: {
    name: string;
    email: string;
  };
}

// File upload interfaces
export interface FileUploadRequest {
  file: File;
  folderId?: string;
  name?: string;
}

export interface FileUploadResponse {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  folderId: string | null;
  createdAt: string;
}

// Download response
export interface DownloadResponse {
  downloadUrl: string;
  expiresAt: string;
}
