import { Header } from "@/components/features/marketing/Header";
import { Footer } from "@/components/features/marketing/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Privacy Policy
            </h1>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  At MeDrive, we respect your privacy and are committed to
                  protecting your personal data. This privacy policy will inform
                  you about how we look after your personal data when you visit
                  our website or use our services and tell you about your
                  privacy rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
                <p className="text-muted-foreground">
                  We may collect, use, store and transfer different kinds of
                  personal data about you which we have grouped together as
                  follows:
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>
                    Identity Data including first name, last name, username or
                    similar identifier
                  </li>
                  <li>
                    Contact Data including billing address, delivery address,
                    email address and telephone numbers
                  </li>
                  <li>
                    Technical Data including internet protocol (IP) address,
                    browser type and version
                  </li>
                  <li>
                    Usage Data including information about how you use our
                    website and services
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">
                  3. How We Use Your Data
                </h2>
                <p className="text-muted-foreground">
                  We will only use your personal data when the law allows us to.
                  Most commonly, we will use your personal data in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>
                    Where we need to perform the contract we are about to enter
                    into or have entered into with you
                  </li>
                  <li>
                    Where it is necessary for our legitimate interests and your
                    interests and fundamental rights do not override those
                    interests
                  </li>
                  <li>
                    Where we need to comply with a legal or regulatory
                    obligation
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used or
                  accessed in an unauthorised way, altered or disclosed. In
                  addition, we limit access to your personal data to those
                  employees, agents, contractors and other third parties who
                  have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
                <p className="text-muted-foreground">
                  We will only retain your personal data for as long as
                  necessary to fulfil the purposes we collected it for,
                  including for the purposes of satisfying any legal,
                  accounting, or reporting requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">
                  6. Your Legal Rights
                </h2>
                <p className="text-muted-foreground">
                  Under certain circumstances, you have rights under data
                  protection laws in relation to your personal data, including
                  the right to request access, correction, erasure, restriction,
                  transfer, or to object to processing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy or our
                  privacy practices, please contact us at
                  privacy@medrive.example.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
