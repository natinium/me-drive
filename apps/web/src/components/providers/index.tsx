"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useState, type ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  session: any; // same type returned by next-auth
}

export default function SessionProvider({ children, session }: ProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <NextAuthSessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
}
