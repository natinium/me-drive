import NextAuth from "next-auth";
import { authOptions } from "@/auth";

// In NextAuth v5, `NextAuth(authOptions)` returns an object with handlers.
// We already create and export those in `@/auth`, so simply re-export them here.
export { GET, POST } from "@/auth";
