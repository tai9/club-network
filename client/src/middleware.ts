import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const memberId = req.cookies.get("memberId")?.value;

  if (memberId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`member/${memberId}`, req.url));
  } else {
    return NextResponse.next();
  }
}
