import { SignupForm, AuthHeader } from "@/components/features/auth";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <AuthHeader />
      <SignupForm />
    </div>
  );
}
