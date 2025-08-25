import { Button } from "@/components/ui/button";
import Link from "next/link";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Your Personal Cloud Storage
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Securely store, share, and access your files from anywhere.
              Self-hosted and open source.
            </p>
          </div>
          <div className="space-x-4 pt-4">
            <Button asChild size="lg">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
