import { Header } from "@/components/features/marketing/Header";
import { Footer } from "@/components/features/marketing/Footer";
import { FeatureSection } from "@/components/features/marketing/FeatureSection/FeatureSection";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features for Your Workflow
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to store, share, and manage your files with
              complete privacy and control.
            </p>
          </div>

          <FeatureSection />

          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Additional Features
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">File Versioning</h3>
                <p className="text-muted-foreground">
                  Keep track of changes to your files with automatic versioning.
                  Restore previous versions whenever needed.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Advanced Search</h3>
                <p className="text-muted-foreground">
                  Find files quickly with powerful search capabilities including
                  full-text search and metadata filtering.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Offline Access</h3>
                <p className="text-muted-foreground">
                  Access your files even without an internet connection with our
                  offline sync capabilities.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">File Preview</h3>
                <p className="text-muted-foreground">
                  Preview documents, images, videos, and other file types
                  directly in the browser without downloading.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Audit Logs</h3>
                <p className="text-muted-foreground">
                  Track all file activities with detailed audit logs for
                  compliance and security monitoring.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">API Access</h3>
                <p className="text-muted-foreground">
                  Integrate MeDrive with your existing tools and workflows
                  through our comprehensive REST API.
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
