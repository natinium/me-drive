import { Header } from "@/components/features/marketing/Header";
import { Footer } from "@/components/features/marketing/Footer";

export default function TermsOfService() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Terms of Service
            </h1>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  Welcome to MeDrive. These Terms of Service govern your use of
                  our website and services. By accessing or using MeDrive, you
                  agree to be bound by these Terms. If you disagree with any
                  part of these terms, you may not access the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Services</h2>
                <p className="text-muted-foreground">
                  MeDrive provides cloud storage services that allow you to
                  store, share, and manage your digital files. The services are
                  provided on an "as is" and "as available" basis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Accounts</h2>
                <p className="text-muted-foreground">
                  When you create an account with us, you must provide accurate
                  and complete information. You are responsible for maintaining
                  the confidentiality of your account and password and for
                  restricting access to your computer. You agree to accept
                  responsibility for all activities that occur under your
                  account or password.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">
                  4. Intellectual Property
                </h2>
                <p className="text-muted-foreground">
                  The service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  MeDrive and its licensors. Our trademarks and trade dress may
                  not be used in connection with any product or service without
                  the prior written consent of MeDrive.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Changes</h2>
                <p className="text-muted-foreground">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will try to provide at least 30 days' notice prior to any new
                  terms taking effect. What constitutes a material change will
                  be determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please contact us
                  at legal@medrive.example.com.
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
