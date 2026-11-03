"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LinkButton } from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { href: "/programs", label: "Courses" },
  { href: "/corporate-training", label: "For Companies" },
  { href: "/admissions", label: "Admissions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        transparent
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-border bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-(--container-site) items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className={`font-heading text-xl font-extrabold transition-colors ${
            transparent ? "text-white" : "text-navy"
          }`}
        >
          NS-VTC
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-[15px] font-medium transition-colors ${
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-ink hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher transparent={transparent} />
          <LinkButton href="/register" variant={transparent ? "secondaryOnDark" : "accent"}>
            Apply Now
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-control transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 md:hidden ${
            transparent ? "text-white" : "text-ink"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-border bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-control px-2 py-3 font-body text-base font-medium text-ink hover:bg-surface"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-4">
            <LanguageSwitcher transparent={false} />
            <LinkButton href="/register" variant="accent" className="flex-1">
              Apply Now
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
