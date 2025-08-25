import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth"; // Assuming auth is exported from here

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // The matcher ensures that the middleware runs on all routes inside the (main) group,
  // while ignoring static files, images, and the favicon.
  matcher: [
    "/dashboard/:path*",
    "/drive/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
