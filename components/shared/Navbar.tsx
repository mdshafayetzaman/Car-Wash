"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Clock, GitCompare, Grid2x2, Menu } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { title: "Services", href: "/services", icon: Grid2x2 },
  { title: "Compare", href: "/compare", icon: GitCompare },
  { title: "About Us", href: "/about", icon: Clock },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="w-full border-b border-border/70 bg-background shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 lg:h-[68px] lg:px-10">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                nativeButton
                aria-label="Open navigation menu"
                className="lg:hidden"
              />
            }
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>

          <SheetContent side="left" className="w-[86vw] max-w-[320px] gap-0 p-0">
            <SheetHeader className="border-b border-border/70 p-5">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Browse our car wash services
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((item) => (
                <SheetClose
                  key={item.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-muted",
                        isActive(item.href)
                          ? "text-brand-navy"
                          : "text-foreground",
                      )}
                    />
                  }
                >
                  <item.icon className="size-[18px]" aria-hidden="true" />
                  {item.title}
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto border-t border-border/70 p-4">
              <Button
                nativeButton={false}
                render={<Link href="/booking" />}
                className="h-12 w-full rounded-lg bg-brand-yellow text-base font-semibold text-white hover:bg-brand-yellow-dark"
              >
                Book Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-10">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-2 py-2 text-[15px] font-medium transition-colors hover:text-brand-navy",
                isActive(item.href) ? "text-brand-navy" : "text-foreground",
              )}
            >
              <item.icon
                className="size-[18px] text-muted-foreground transition-colors group-hover:text-brand-navy"
                aria-hidden="true"
              />
              {item.title}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-brand-yellow transition-opacity",
                  isActive(item.href)
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-60",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Book Now */}
        <Button
          nativeButton={false}
          render={<Link href="/booking" />}
          className="h-12 shrink-0 rounded-lg bg-brand-yellow px-6 text-base font-semibold text-white hover:bg-brand-yellow-dark sm:px-8"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
