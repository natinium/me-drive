import { Header } from "@/components/features/marketing/Header";
import { Footer } from "@/components/features/marketing/Footer";
import { PricingSection } from "@/components/features/marketing/PricingSection";

export default function PricingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that works best for you and your team. All plans
              include a 14-day free trial.
            </p>
          </div>

          <PricingSection />

          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. When
                  upgrading, you'll be charged a prorated amount for the
                  remainder of your billing cycle. When downgrading, the change
                  will take effect at the end of your current billing cycle.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards including Visa, Mastercard,
                  American Express, and Discover. For Business plans, we also
                  offer invoicing and bank transfer options.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Is there a discount for non-profits or educational
                  institutions?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we offer special pricing for non-profit organizations and
                  educational institutions. Please contact our sales team to
                  learn more about our discount programs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  What happens when I exceed my storage limit?
                </h3>
                <p className="text-muted-foreground">
                  When you approach your storage limit, you'll receive email
                  notifications. If you exceed your limit, you'll still be able
                  to access your existing files, but you won't be able to upload
                  new ones until you free up space or upgrade your plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
