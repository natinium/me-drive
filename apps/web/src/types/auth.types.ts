// Authentication Types based on API documentation

import { ApiResponse, ApiError } from "./api.types";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  storageUsed: number;
  storageLimit: number;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

// Auth error codes from API documentation
export type AuthErrorCode =
  | "AUTH001" // Invalid credentials
  | "AUTH002" // Token expired
  | "AUTH003" // Invalid token
  | "AUTH004"; // User not found;
