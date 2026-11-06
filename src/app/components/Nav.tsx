"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LinkButton } from "./Button";

const dropdownItems = [
  { href: "/programs/tvet", label: "TVET Training" },
  { href: "/programs/hse", label: "HSE Training" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/careers", label: "Careers" },
  { href: "/resources", label: "Resources" },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs", dropdown: true },
  { href: "/admissions", label: "Admissions" },
  { href: "/#contact", label: "Contact" },
];

const darkHeroRoutes = ["/", "/about", "/admissions"];

export default function Nav() {
  const pathname = usePathname();
  const hasDarkHero = darkHeroRoutes.includes(pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const transparent = hasDarkHero && !scrolled && !mobileOpen;

  const linkClass = (href: string) => {
    const active = pathname === href && !href.includes("#");
    return `relative font-body text-[15px] font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:transition-transform after:duration-200 ${
      transparent
        ? `text-white/90 hover:text-white after:bg-white ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`
        : `hover:text-navy after:bg-navy ${active ? "text-navy after:scale-x-100" : "text-ink after:scale-x-0 hover:after:scale-x-100"}`
    }`;
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        transparent ? "bg-transparent" : "border-b border-border bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-(--container-site) items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className={`font-heading text-xl font-extrabold transition-colors ${transparent ? "text-white" : "text-navy"}`}
        >
          NS-VTC
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.href} ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className={`flex items-center gap-1 ${linkClass(link.href)}`}
                >
                  {link.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-xl border border-border bg-white py-2 shadow-lg">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-border bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col" aria-label="Primary">
            {links.map((link) =>
              link.dropdown ? (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-control px-2 py-3 font-body text-base font-medium text-ink transition-colors hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                  <div className="ml-4 flex flex-col border-l border-border pl-3">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-sm font-medium text-muted transition-colors hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-control px-2 py-3 font-body text-base font-medium transition-colors hover:bg-surface ${
                    pathname === link.href ? "font-semibold text-navy" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="mt-4">
            <LinkButton href="/register" variant="accent" className="w-full">
              Apply Now
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
