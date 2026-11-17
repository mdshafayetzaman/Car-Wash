import Image from "next/image";
import Link from "next/link";

import { Check } from "lucide-react";

const PERKS = [
  "Express wash in under 15 minutes",
  "Eco-friendly water recycling",
  "Trained detailing specialists",
  "Book, track and pay from your phone",
] as const;

export function AuthBrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-brand-navy lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-12 xl:p-14">
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 size-[26rem] rounded-full bg-brand-yellow/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-48 size-[30rem] rounded-full bg-brand-navy-light/70 blur-3xl"
      />

      {/* Brand */}
      <div className="relative flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Car Wash"
          width={48}
          height={48}
          className="h-11 w-11"
        />
        <span className="text-lg font-semibold tracking-tight text-white">
          Car Wash
        </span>
      </div>

      {/* Headline + perks */}
      <div className="relative max-w-md">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-brand-yellow uppercase">
          Premium detailing
        </span>

        <h1 className="mt-6 text-4xl leading-[1.15] font-semibold tracking-tight text-white xl:text-[2.75rem]">
          Keep your car{" "}
          <span className="text-brand-yellow">showroom-ready</span>, every
          single week.
        </h1>

        <p className="mt-4 text-[15px] leading-relaxed text-white/60">
          Join thousands of drivers who book their wash in seconds and drive
          away in a spotless car.
        </p>

        <ul className="mt-8 space-y-3">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-[15px] text-white/75">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="relative grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        {[
          { value: "12k+", label: "Washes" },
          { value: "4.9", label: "Rating" },
          { value: "15m", label: "Average" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-semibold text-white">{stat.value}</div>
            <div className="mt-0.5 text-xs tracking-wide text-white/45 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="relative mt-4 inline-flex w-fit items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-brand-yellow"
      >
        ← Back to home
      </Link>
    </aside>
  );
}
