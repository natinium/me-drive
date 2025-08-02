import { Logo } from "@/components/ui/logo";

export function AuthHeader() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Logo className="h-8 w-auto" />
      <h1 className="text-2xl font-bold tracking-tight">MeDrive</h1>
    </div>
  );
}
