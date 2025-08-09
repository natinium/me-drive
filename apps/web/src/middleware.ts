import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You can add custom logic here if needed, for example, role-based access control.
    // The default behavior of withAuth is to redirect to the login page if the user is not authenticated.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  // The matcher ensures that the middleware runs on all routes inside the (main) group,
  // while ignoring static files, images, and the favicon.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)"],
};
