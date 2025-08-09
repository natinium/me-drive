import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header skeleton */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Skeleton className="h-6 w-24" />
        <div className="ml-auto hidden lg:flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
        <Skeleton className="ml-auto lg:hidden h-10 w-10" />
      </header>

      <main>
        {/* Hero skeleton */}
        <section className="w-full h-screen flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Skeleton className="h-16 w-96 mx-auto" />
                <Skeleton className="h-6 w-96 mx-auto" />
                <Skeleton className="h-6 w-80 mx-auto" />
              </div>
              <div className="space-x-4 pt-4">
                <Skeleton className="h-12 w-32 inline-block" />
                <Skeleton className="h-12 w-32 inline-block" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature section skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-12 w-96" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-12 w-12 mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <Skeleton className="h-8 w-96 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="mt-6">
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <Skeleton className="h-4 w-48" />
        <div className="sm:ml-auto flex gap-4 sm:gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </footer>
    </div>
  );
}
