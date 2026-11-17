import type { ReactNode } from "react";

/**
 * Shared layout for the auth route group.
 *
 * The sign-in / sign-up screens render their own full-viewport shell
 * (brand panel + form), so this only needs to pass `children` through.
 *
 * A layout MUST render `children` — otherwise every segment below it is
 * dropped from rendering and Next.js 16's instant-navigation validation
 * fails with `instant-unrendered-segment`.
 *
 * When you add Better Auth, this is a good place to redirect already
 * signed-in users away from /signin and /signup.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
