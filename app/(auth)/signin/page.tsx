import type { Metadata } from "next";

import { SignInForm } from "@/components/shared/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Car Wash account to book your next wash.",
};

export default function SignInPage() {
  return <SignInForm />;
}
