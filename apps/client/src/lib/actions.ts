"use server";

import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          // This error is thrown by your `authorize` function when you return null
          return "Invalid email or password.";
        default:
          // Handles other auth-related errors (e.g., network issues with the provider)
          return "Something went wrong. Please try again.";
      }
    }
    throw error;
  }
}

export async function signup(
  prevState: string | undefined,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!name || !email || !password) {
    return "All fields are required.";
  }

  try {
    const signupResponse = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!signupResponse.ok) {
      const errorData = await signupResponse.json();
      return errorData.message || "An error occurred during signup.";
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    if (error instanceof AuthError) {
      return "Login failed after signup. Please try logging in manually.";
    }

    console.error("Signup Action Error:", error);
    return "An unexpected error occurred. Please try again.";
  }
}

export async function createFolder(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (!session?.accessToken) return { message: "Not authenticated" };

  const folderName = formData.get("folderName") as string;
  // parentId can be null for root folders. The form will send an empty string.
  const parentId = formData.get("parentId") || null;

  if (!folderName) {
    return { message: "Folder name is required." };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        name: folderName,
        parentId: parentId ? Number(parentId) : null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || "Failed to create folder." };
    }

    // Success! Revalidate the path to refresh the file/folder list.
    revalidatePath("/my-drive", "layout"); // Revalidate the whole layout to catch all folder depths
    return { message: "success" }; // Return success to the client
  } catch (error) {
    console.error(error);
    return { message: "An unexpected error occurred." };
  }
}

// --- NEW: Action to upload a file ---
export async function uploadFile(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (!session?.accessToken) return { message: "Not authenticated" };

  const file = formData.get("file") as File;
  const parentId = formData.get("parentId") || null;

  if (!file || file.size === 0) {
    return { message: "A file is required." };
  }

  // File uploads must use FormData, not JSON.
  const apiFormData = new FormData();
  apiFormData.append("file", file);
  if (parentId) {
    apiFormData.append("parentId", parentId as string);
  }

  try {
    // IMPORTANT: Do NOT set the 'Content-Type' header manually for FormData.
    // The browser will set it automatically with the correct boundary.
    const response = await fetch(`${process.env.API_URL}/files/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: apiFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || "Failed to upload file." };
    }

    revalidatePath("/my-drive", "layout");
    return { message: "success" };
  } catch (error) {
    console.error(error);
    return { message: "An unexpected error occurred." };
  }
}
