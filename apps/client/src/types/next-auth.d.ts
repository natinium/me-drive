// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

/**
 * The User object you get back from the `authorize` callback.
 * You need to add any properties you want to pass from `authorize` to `jwt`.
 */
declare module "next-auth" {
  interface User {
    accessToken?: string;
  }
}

/**
 * The token object you get in the `jwt` callback.
 * You need to add any properties you want to persist in the JWT.
 */
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

/**
 * The session object you get from `useSession` or `auth()`.
 * You need to add any properties you want to be available on the client session.
 */
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string; // Ensure id is part of the session user
    } & DefaultSession["user"];
  }
}
