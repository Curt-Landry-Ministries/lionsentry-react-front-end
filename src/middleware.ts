import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AuthedPaths, Paths } from "./lib/constants";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthenticated =
    !!cookies().get("authToken")?.value || !!cookies().get("userID")?.value;
  const loginOrSignup =
    pathname.startsWith(Paths.Login) || pathname.startsWith(Paths.Signup);
  const url = request.nextUrl.clone();

  if (url.pathname === "/" && !isAuthenticated) {
    url.pathname = "/home";
    return NextResponse.rewrite(url);
  }

  // If the page is not login or sign up and user is not authenticated
  // redirect to the homepage. MUST includes pathname is not home
  // to prevent infinite redirections
  if (!loginOrSignup && pathname !== Paths.Home && !isAuthenticated) {
    return NextResponse.redirect(new URL(Paths.Home, request.url));
  }

  // If user is authenticated and still goes to login or signup,
  // redirect to dashboard
  if ((loginOrSignup || pathname === Paths.Home) && isAuthenticated) {
    return NextResponse.redirect(new URL(AuthedPaths.Dashboard, request.url));
  }

  // everything else just resolve the response
  return NextResponse.next();
}

// must includes this so next/api routes are not intecepted
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|icon|icons).*)"],
};
