// This file simulates a data access layer.
// When the real backend is ready, you will only need to update this file
// to make `fetch` calls to your NestJS API endpoints.

import type { User, RegisterPayload, AuthResponse } from "@/types/auth.types";

// In-memory user storage for development
const users: User[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    password: "password123", // In a real app, this would be a hash
    createdAt: new Date().toISOString(),
  },
];

/**
 * Simulates fetching a user by email from the database.
 * @param email The user's email.
 * @returns The user object or undefined if not found.
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  console.log(`[API Mock] Fetching user by email: ${email}`);
  return users.find((user) => user.email === email);
}

/**
 * Simulates a POST request to a /auth/register endpoint.
 * @param data The user registration data.
 * @returns The API response containing the new user and tokens.
 * @throws An error if the user already exists.
 */
export async function register(data: RegisterPayload): Promise<AuthResponse> {
  console.log("[API Mock] Attempting to register user:", data.email);
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    // In a real API, this would be a proper error response.
    throw new Error("User with this email already exists.");
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    name: data.name,
    email: data.email,
    password: data.password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  console.log("[API Mock] New user created:", newUser);

  // Simulate the API response structure from the documentation
  return {
    success: true,
    data: {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      },
      token: "jwt-access-token-for-" + newUser.id,
      refreshToken: "jwt-refresh-token-for-" + newUser.id,
    },
    message: "User registered successfully",
    timestamp: new Date().toISOString(),
  };
}
