"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignupForm, AuthHeader } from "@/components/features/auth";

export default function SignupPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "authenticated") return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <AuthHeader />
      <SignupForm />
    </div>
  );
}
