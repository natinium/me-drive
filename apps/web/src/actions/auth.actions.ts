"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { registerUser } from "@/lib/api";

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      redirectTo: "/dashboard",
      ...Object.fromEntries(formData.entries()),
    });
    return { success: true };
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      throw error;
    }
    return { error: "Invalid credentials" };
  }
}

const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // path to show the error
  });

export async function signUpAction(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your input.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await registerUser({ name, email, password });
  } catch (error: any) {
    return {
      message: error.message || "An unexpected error occurred.",
    };
  }

  // Automatically sign in the user after successful registration
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
    // If NextAuth didn't throw a redirect, ensure navigation happens
    redirect("/dashboard");
  } catch (error) {
    // Re-throw NextAuth redirect so the App Router performs navigation
    const message = (error as any)?.message || "";
    if (message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    if ((error as any).type === "CredentialsSignin") {
      throw error;
    }
    console.error("Failed to sign in after registration:", error);
    // Redirect to login even if auto-signin fails
    redirect("/login?registered=true");
  }
}
