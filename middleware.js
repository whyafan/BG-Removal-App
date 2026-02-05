import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes including API routes, but skip static assets and Next internals
    "/((?!_next|.*\\.(?:css|js|map|png|jpg|jpeg|svg|gif|ico|webp|txt|xml)).*)",
    "/api/(.*)",
  ],
};
