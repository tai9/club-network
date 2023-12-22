import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const memberId = req.cookies.get("memberId")?.value;

  if (!memberId && req.nextUrl.pathname.includes("account")) {
    return NextResponse.redirect(new URL(`/`, req.url));
  } else {
    return NextResponse.next();
  }
}
