import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default async function MarketingPage() {
  const session = await auth();

  // If the user is already logged in, redirect them to the dashboard.
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Subtle background using CSS gradients */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-10 text-center md:gap-10">
        <div className="flex items-center gap-2 rounded-full border bg-gray-50 px-3 py-1 text-sm text-muted-foreground shadow-sm">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span>Secure. Fast. Reliable.</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Your Files, Securely
          <br />
          in the <span className="text-blue-600">Cloud</span>
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          G-Drive Clone offers a seamless and secure platform to store, access,
          and collaborate on your files from anywhere in the world.
        </p>

        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/auth/login">Get Started</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Link href="/auth/signup">Sign Up for Free</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
