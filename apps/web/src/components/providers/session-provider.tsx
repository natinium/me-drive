"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";

interface SessionProviderProps {
  children: React.ReactNode;
  session: any; // The session object from getServerSession
}

export default function SessionProvider({
  children,
  session,
}: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
