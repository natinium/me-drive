import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 MeDrive. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="#about"
        >
          About
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/terms"
        >
          Terms
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/privacy"
        >
          Privacy
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/login"
        >
          Sign In
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
