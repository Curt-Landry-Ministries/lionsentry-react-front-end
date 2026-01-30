import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AuthedPaths, Paths } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();

  const pathname = request.nextUrl.pathname;
  const isAuthenticated =
    !!cookiesStore.get("authToken")?.value ||
    !!cookiesStore.get("userID")?.value;
  const loginOrSignup =
    pathname.startsWith(Paths.Login) ||
    pathname.startsWith(Paths.Signup) ||
    pathname.startsWith(Paths.ResetPassword) ||
    pathname.startsWith(Paths.Privacy) ||
    pathname.startsWith(Paths.Terms) ||
    pathname.startsWith(Paths.Migrate)
  const url = request.nextUrl.clone();
  const whyStatement = !!cookiesStore.get("whyStatement")?.value;

  if (url.pathname === Paths.Outbound) return NextResponse.next();

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

  if (
    !loginOrSignup &&
    pathname !== AuthedPaths.Questionnaire &&
    isAuthenticated &&
    !whyStatement
  ) {
    return NextResponse.redirect(
      new URL(AuthedPaths.Questionnaire, request.url)
    );
  }

  // If user is authenticated and still goes to login or signup,
  // redirect to dashboard
  if (
    (loginOrSignup || pathname === Paths.Home) &&
    isAuthenticated &&
    !pathname.startsWith(Paths.Terms) &&
    !pathname.startsWith(Paths.Privacy) &&
    !pathname.startsWith(Paths.Migrate) 

  ) {
    return !!whyStatement
      ? NextResponse.redirect(new URL(AuthedPaths.Dashboard, request.url))
      : NextResponse.redirect(new URL(AuthedPaths.Questionnaire, request.url));
  }

  // everything else just resolve the response
  return NextResponse.next();
}

// must includes this so next/api routes are not intecepted
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|icon|icons).*)"],
};