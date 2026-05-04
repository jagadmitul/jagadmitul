"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { NAV, PROFILE } from "@/lib/data";
import { PaletteDropdown } from "./PaletteDropdown";

const NAV_ICONS: Record<string, React.ReactNode> = {
  "/": (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M15.833 7.258 11.39 3.802a2.222 2.222 0 0 0-2.728 0L4.216 7.258a2.22 2.22 0 0 0-.858 1.754v6a1.667 1.667 0 0 0 1.667 1.667h10a1.667 1.667 0 0 0 1.667-1.666v-6c0-.686-.317-1.334-.859-1.755Z" />
      <path d="M13.333 12.5c-1.841 1.11-4.826 1.11-6.667 0" />
    </svg>
  ),
  "/about": (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M10.5 10.833a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M10.5 2.5c6 0 7.5 1.5 7.5 7.5s-1.5 7.5-7.5 7.5S3 16 3 10s1.5-7.5 7.5-7.5Z" />
      <path d="M5.5 16.708v-.041a3.333 3.333 0 0 1 3.333-3.334h3.334a3.333 3.333 0 0 1 3.333 3.334v.041" />
    </svg>
  ),
  "/services": (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M10.5 3.333 3.833 6.667 10.5 10l6.667-3.333L10.5 3.333ZM3.833 10l6.667 3.333L17.167 10M3.833 13.333l6.667 3.334 6.667-3.334" />
    </svg>
  ),
  "/portfolio": (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="m3.503 5.998 5.949-2.591a.8.8 0 0 1 1.058.439l4.103 9.918a.834.834 0 0 1-.428 1.087l-5.948 2.59a.8.8 0 0 1-1.059-.438l-4.103-9.92a.833.833 0 0 1 .428-1.085ZM13 3.333h.833a.833.833 0 0 1 .834.834v2.916M17.167 5c.22.093.433.18.64.263a.833.833 0 0 1 .442 1.092l-1.915 4.478" />
    </svg>
  ),
  "/blog": (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="m14.667 9.167 1.25-1.25a2.357 2.357 0 1 0-3.333-3.334l-8.75 8.75v3.334h3.333L8.834 15m2.916-9.583 3.333 3.333m.417 9.583 2.792-2.736a1.785 1.785 0 0 0 .004-2.56 1.87 1.87 0 0 0-2.608-.005l-.186.184-.186-.184a1.869 1.869 0 0 0-2.607-.005 1.787 1.787 0 0 0-.005 2.56l2.796 2.746Z" />
    </svg>
  ),
  "/contact": (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M6.667 7.5h6.666m-6.666 3.333h5M15 3.333a2.5 2.5 0 0 1 2.5 2.5V12.5A2.5 2.5 0 0 1 15 15h-4.167l-4.166 2.5V15H5a2.5 2.5 0 0 1-2.5-2.5V5.833a2.5 2.5 0 0 1 2.5-2.5h10Z" />
    </svg>
  ),
};

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      <div className="flex items-center justify-between rounded-2xl bg-paper-2/85 backdrop-blur-xl p-3 shadow-card border border-hairline">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-3 text-2xl font-semibold text-ink"
        >
          <span>
            Mitul<span className="text-primary">Jagad</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden flex-1 flex-wrap items-center justify-center lg:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className={clsx("px-2", active && "active")}>
                <Link
                  href={item.href}
                  className={clsx(
                    "group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition",
                    active
                      ? "bg-primary/15 text-primary ring-1 ring-primary/25"
                      : "text-ink-mute hover:bg-primary/10 hover:text-ink",
                  )}
                >
                  <span
                    className={clsx(
                      "transition",
                      active
                        ? "text-primary"
                        : "text-ink-mute group-hover:text-ink",
                    )}
                  >
                    {NAV_ICONS[item.href]}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Header right cluster: palette + CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <PaletteDropdown />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-ink transition hover:bg-primary-hover"
          >
            Let&apos;s Talk
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile cluster: palette + menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <PaletteDropdown />
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-paper p-2 text-ink"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm" />
              <Dialog.Content className="fixed top-0 right-0 z-[70] h-full w-[min(320px,85vw)] bg-paper-2 p-6 shadow-2xl outline-none">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-semibold">
                    Mitul<span className="text-primary">Jagad</span>
                  </span>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-ink-mute hover:bg-paper hover:text-ink"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                <nav>
                  <ul className="space-y-1">
                    {NAV.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={clsx(
                              "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium",
                              active
                                ? "bg-primary/15 text-primary ring-1 ring-primary/25"
                                : "text-ink-mute hover:bg-primary/10 hover:text-ink",
                            )}
                          >
                            {NAV_ICONS[item.href]}
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-ink hover:bg-primary-hover transition"
                  >
                    Let&apos;s Talk
                  </Link>

                  <div className="mt-8 border-t border-hairline pt-6">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm text-ink-mute hover:text-ink"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
