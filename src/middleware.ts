import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/new"];

const isAuthenticated = process.env.NODE_ENV === "development";

export default function middleware(req: NextRequest) {
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL);
  }
  return NextResponse.next();
}

export const config = {
  matches: protectedRoutes,
};
