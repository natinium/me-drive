import { Button } from "@/components/ui/button";
import Link from "next/link";
import styles from "./cta.module.css";

const CTA = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Ready to Take Control of Your Data?
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Sign up for MeDrive today and experience the freedom of a
            self-hosted cloud.
          </p>
        </div>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
