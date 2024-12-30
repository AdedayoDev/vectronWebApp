
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Redirect if the user visits `/old-page`
  if (pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/auth/log-in", request.url));
  }

  if (pathname === "/auth/sign-up") {
    let user = localStorage.getItem("user");
    if (user) {
      return NextResponse.redirect(new URL("/auth/log-in", request.url));
    }
  }

  // Example: Add a custom header
  const response = NextResponse.next();
  response.headers.set("x-custom-header", "my-custom-header-value");
  return response;
}

export const config = {
  matcher: ["/onboarding", "/auth/sign-up"],
  // Apply middleware to specific routes
};
