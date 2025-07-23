// src/auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Your API_URL check is good practice, but not directly used in this fetch.
// You might want to use it like: `${process.env.API_URL}/auth/login`
if (!process.env.API_URL) {
  throw new Error("Missing API_URL environment variable");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can leave this empty since you have a custom login page
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            // The request failed (e.g., 401 Unauthorized from your NestJS app)
            return null;
          }

          const data = await response.json();

          // --- THIS IS THE UPDATED LOGIC ---
          // We now check for `data.user` and `data.access_token` to match your NestJS response
          if (data && data.user && data.access_token) {
            // Attach the token to the user object so it can be saved in the JWT session
            const userWithToken = {
              ...data.user,
              accessToken: data.access_token, // Use `data.access_token` here
            };
            return userWithToken;
          }

          // If the response structure is incorrect, authentication fails.
          return null;
        } catch (error) {
          // This catches network errors, e.g., if the backend is down
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});
