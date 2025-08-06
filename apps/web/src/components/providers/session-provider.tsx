"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import React, { createContext, useContext, useState, useCallback } from "react";

type SessionContextType = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function Providers({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);

  // This context allows client-side updates to the session (e.g. after login/logout)
  const updateSession = useCallback((newSession: Session | null) => {
    setSession(newSession);
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession: updateSession }}>
      <NextAuthSessionProvider session={session}>
        {children}
      </NextAuthSessionProvider>
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSessionContext must be used within Providers");
  return ctx;
}
