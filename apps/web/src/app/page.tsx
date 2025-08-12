import { Header } from "@/components/features/marketing/Header/Header";
import { Hero } from "@/components/features/marketing/Hero/Hero";
import { FeatureSection } from "@/components/features/marketing/FeatureSection/FeatureSection";
import { PricingSection } from "@/components/features/marketing/PricingSection/PricingSection";
import { TestimonialsSection } from "@/components/features/marketing/TestimonialsSection/TestimonialsSection";
import { AboutSection } from "@/components/features/marketing/AboutSection/AboutSection";
import { FAQSection } from "@/components/features/marketing/FAQSection/FAQSection";
import { CTA } from "@/components/features/marketing/CTA/CTA";
import { Footer } from "@/components/features/marketing/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeatureSection />
      <PricingSection />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <CTA />
      <Footer />
    </>
  );
}
