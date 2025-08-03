// Common API Types based on API documentation

import { User } from "./auth.types";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

export interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Error codes from API documentation
export type ErrorCode =
  // Authentication Errors
  | "AUTH001" // Invalid credentials
  | "AUTH002" // Token expired
  | "AUTH003" // Invalid token
  | "AUTH004" // User not found
  // File Errors
  | "FILE001" // File not found
  | "FILE002" // Insufficient permissions
  | "FILE003" // File already exists
  | "FILE004" // Invalid file type
  | "FILE005" // File too large
  // Folder Errors
  | "FOLD001" // Folder not found
  | "FOLD002" // Circular folder structure
  | "FOLD003" // Folder name already exists
  | "FOLD004" // Cannot delete root folder
  // Storage Errors
  | "STOR001" // Storage limit exceeded
  | "STOR002" // Upload failed
  | "STOR003"; // Download failed

export interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number | null;
}
