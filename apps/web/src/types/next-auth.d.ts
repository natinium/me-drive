import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { User as AppUser } from "./auth.types";

declare module "next-auth" {
  interface Session {
    user: AppUser;
    accessToken: string;
    error?: string;
  }

  interface User extends AppUser {
    token: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: AppUser;
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}
