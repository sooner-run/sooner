import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("sooner.auth-token")?.value;

  if (!token) {
    const allowedPaths = [
      "/login",
      "/",
      "/docs",
      "/pricing",
      "/promise",
      "/faq",
      "/changelog",
      "/signup",
      "/verify",
    ];

    if (!allowedPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (token) {
    if (req.url.includes("/login"))
      return NextResponse.redirect(new URL("/dashboard", req.url));

    if (req.url.includes("/signup"))
      return NextResponse.redirect(new URL("/dashboard", req.url));
  }
};

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt|sooner-logo.svg|logo.png|screenshot.png|ss.png|ui.png|gorgeous.png).*)",
  ],
};

export default middleware;
