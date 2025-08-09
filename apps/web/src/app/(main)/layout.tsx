import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import SessionProvider from "@/components/providers/session-provider";
import { AppSidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { GlobalModals } from "@/components/layout/global-modals";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AppSidebar />
        <div className="flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
        <GlobalModals />
        <SidebarTrigger className="fixed bottom-4 right-4 md:hidden" />
      </div>
    </SessionProvider>
  );
}
