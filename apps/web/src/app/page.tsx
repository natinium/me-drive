import { CTA } from "@/components/features/marketing/CTA";
import { FeatureSection } from "@/components/features/marketing/FeatureSection";
import { Footer } from "@/components/features/marketing/Footer";
import { Header } from "@/components/features/marketing/Header";
import { Hero } from "@/components/features/marketing/Hero";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
