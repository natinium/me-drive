"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { register } from "@/lib/api";

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
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

  try {
    await register(validatedFields.data);
  } catch (error: any) {
    return {
      message: error.message || "An unexpected error occurred.",
    };
  }

  redirect("/login?registered=true");
}
