import type { Metadata } from "next";

import { SignUpForm } from "@/components/shared/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a Car Wash account and book your first wash.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
