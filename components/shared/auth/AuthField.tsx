import type { ReactNode } from "react";

import { cn } from "cn";
import { Label } from "@/components/ui/label";

/**
 * Shared input styling for the auth forms.
 * Passed as `className` to `<Input>` / `<PasswordInput>` so Tailwind can merge it
 * over the base shadcn input classes.
 */
export const authInputClass =
  "h-11 rounded-lg border-white/10 bg-white/[0.04] px-3.5 text-[15px] text-white placeholder:text-white/35 transition-colors focus-visible:border-brand-yellow focus-visible:ring-brand-yellow/25 aria-invalid:border-red-400/70 aria-invalid:ring-red-400/20";

type AuthFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  hint?: ReactNode;
  error?: string | null;
  action?: ReactNode;
  className?: string;
};

export function AuthField({
  id,
  label,
  children,
  hint,
  error,
  action,
  className,
}: AuthFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id} className="text-[13px] font-medium text-white/75">
          {label}
        </Label>
        {action}
      </div>
      {children}
      {hint ? <p className="text-[13px] text-white/45">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-[13px] font-medium text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
