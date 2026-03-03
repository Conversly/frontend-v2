import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Check if the host starts with www.
  if (host.startsWith("www.")) {
    // Remove www. and redirect to the non-www version
    const newHost = host.replace(/^www\./, "");
    url.host = newHost;

    // Return a 308 permanent redirect
    return NextResponse.redirect(url, { status: 308 });
  }

  return NextResponse.next();
}

// Match all paths except static files and API routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
