import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthResponse } from "@/types";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          // You might want to log the error or handle it more gracefully
          return null;
        }

        const data: AuthResponse = await res.json();
        // NextAuth expects the user object to be returned here.
        // We are attaching the tokens to it so they can be picked up in the jwt callback.
        if (data && (data as any).user && (data as any).token) {
          return {
            ...(data as any).user,
            token: (data as any).token,
            refreshToken: (data as any).refreshToken,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: any) {
      // user is only available on the first sign-in
      if (user) {
        token.accessToken = (user as any).token;
        token.refreshToken = (user as any).refreshToken;
        const {
          token: _,
          refreshToken: __,
          ...userWithoutTokens
        } = user as any;
        token.user = userWithoutTokens;
      }
      // TODO: Add logic to refresh the token if it has expired
      return token;
    },
    async session({ session, token }: any) {
      session.user = (token as any).user;
      session.accessToken = (token as any).accessToken;
      return session;
    },
  },
  pages: { signIn: "/login" },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
