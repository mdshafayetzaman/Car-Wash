"use client";

import { cn } from "cn";

type Provider = "google" | "apple";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3.01c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.13A12 12 0 0 0 12 24"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.59H1.28a12 12 0 0 0 0 10.82z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.59l3.99 3.13C6.22 6.86 8.87 4.75 12 4.75"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-4.5"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
    </svg>
  );
}

const LABELS: Record<Provider, string> = {
  google: "Google",
  apple: "Apple",
};

function ProviderIcon({ provider }: { provider: Provider }) {
  return provider === "google" ? <GoogleIcon /> : <AppleIcon />;
}

type SocialAuthButtonsProps = {
  /** Called when a provider button is clicked. Wire this to Better Auth later. */
  onSelect?: (provider: Provider) => void;
  disabled?: boolean;
  className?: string;
};

export function SocialAuthButtons({
  onSelect,
  disabled,
  className,
}: SocialAuthButtonsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {(Object.keys(LABELS) as Provider[]).map((provider) => (
        <button
          key={provider}
          type="button"
          disabled={disabled}
          onClick={() => onSelect?.(provider)}
          className="inline-flex h-11 items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-brand-yellow/40 focus-visible:outline-none disabled:opacity-50"
        >
          <ProviderIcon provider={provider} />
          {LABELS[provider]}
        </button>
      ))}
    </div>
  );
}
