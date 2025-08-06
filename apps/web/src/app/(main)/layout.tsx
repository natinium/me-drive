import { ReactNode } from "react";
import { cookies } from "next/headers";
import { AppSidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { GlobalModals } from "@/components/layout/global-modals";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </div>
      </main>
      <GlobalModals />
    </SidebarProvider>
  );
}
