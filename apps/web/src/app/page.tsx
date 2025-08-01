import { Header } from "@/components/features/marketing/Header";
import { Hero } from "@/components/features/marketing/Hero";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
