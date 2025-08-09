import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Mountain className="h-6 w-6" />
        <span className="ml-2 text-xl font-bold">MeDrive</span>
        <span className="sr-only">MeDrive</span>
      </Link>
      <nav className="ml-auto hidden gap-4 sm:gap-6 lg:flex">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </Link>
      </nav>
      <div className="ml-auto hidden lg:flex gap-2">
        <Button asChild variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-auto lg:hidden" size="icon" variant="outline">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 py-6">
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="/features"
            >
              Features
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="#about"
            >
              About
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="#contact"
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Button asChild variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
