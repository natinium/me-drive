import Header from "@/components/features/marketing/header";
import Hero from "@/components/features/marketing/hero";
import FeatureSection from "@/components/features/marketing/feature-section";
import PricingSection from "@/components/features/marketing/PricingSection";
import TestimonialsSection from "@/components/features/marketing/TestimonialsSection";
import AboutSection from "@/components/features/marketing/about-section";
import FAQSection from "@/components/features/marketing/faq-section";
import CTA from "@/components/features/marketing/cta";
import Footer from "@/components/features/marketing/footer";

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
