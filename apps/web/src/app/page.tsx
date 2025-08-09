import { AboutSection } from "@/components/features/marketing/AboutSection";
import { ContactSection } from "@/components/features/marketing/ContactSection";
import { CTA } from "@/components/features/marketing/CTA";
import { FAQSection } from "@/components/features/marketing/FAQSection";
import { FeatureSection } from "@/components/features/marketing/FeatureSection";
import { Footer } from "@/components/features/marketing/Footer";
import { Header } from "@/components/features/marketing/Header";
import { Hero } from "@/components/features/marketing/Hero";
import { Preloader } from "@/components/features/marketing/Preloader";
import { PricingSection } from "@/components/features/marketing/PricingSection";
import { TestimonialsSection } from "@/components/features/marketing/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="flex min-h-[100dvh] flex-col">
        <Header />
        <main>
          <Hero />
          <FeatureSection />
          <PricingSection />
          <TestimonialsSection />
          <AboutSection />
          <FAQSection />
          <ContactSection />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
