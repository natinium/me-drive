import { LoginForm, AuthHeader } from "@/components/features/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <AuthHeader />
      <LoginForm />
    </div>
  );
}
