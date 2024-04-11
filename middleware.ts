import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth: async (auth, req, evt) => {
    const role = auth.sessionClaims?.role;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");
    if (role !== "admin" && isAdminRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  publicRoutes: [
    "/",
    "/sign-in",
    "sign-up",
    "/favicon.ico",
    "/api/uploadthing",
    "/api/webhooks(.*)"
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/api/uploadthing"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/favicon.ico"],
};