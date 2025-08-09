import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiResponse, AuthResponse } from "@/types";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!res.ok) {
          // You might want to log the error or handle it more gracefully
          return null;
        }

        const apiResponse: ApiResponse<AuthResponse> = await res.json();

        if (apiResponse.success && apiResponse.data) {
          // NextAuth expects the user object to be returned here.
          // We are attaching the tokens to it so they can be picked up in the jwt callback.
          return {
            ...apiResponse.data.user,
            token: apiResponse.data.token,
            refreshToken: apiResponse.data.refreshToken,
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // user is only available on the first sign-in
      if (user) {
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          storageUsed: user.storageUsed,
          storageLimit: user.storageLimit,
          createdAt: user.createdAt,
        };
      }
      // TODO: Add logic to refresh the token if it has expired
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: { signIn: "/login" },
};
