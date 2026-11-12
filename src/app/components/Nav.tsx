"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LinkButton } from "./Button";

const trainingAreas = [
  {
    href: "/programs/tvet",
    label: "TVET Training",
    subItems: [
      { href: "/programs/scaffolding", label: "Scaffolding" },
      { href: "/programs/steel-fixing", label: "Steel Fixing" },
      { href: "/programs/tailoring", label: "Tailoring" },
      { href: "/programs/welding", label: "Welding" },
      { href: "/programs/carpentry", label: "Carpentry" },
      { href: "/programs/painting", label: "Painting" },
      { href: "/programs/masonry", label: "Masonry" },
    ],
  },
  { href: "/programs/hse", label: "HSE Training", subItems: [] },
  { href: "/corporate-training", label: "Corporate Training", subItems: [] },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs", dropdown: true },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Contact" },
];

const darkHeroRoutes = ["/", "/about", "/admissions"];
const darkHeroPrefixes = ["/programs", "/corporate-training", "/careers", "/blog"];

export default function Nav() {
  const rawPathname = usePathname();
  const pathname =
    rawPathname.length > 1 && rawPathname.endsWith("/")
      ? rawPathname.slice(0, -1)
      : rawPathname;
  const hasDarkHero =
    darkHeroRoutes.includes(pathname) ||
    darkHeroPrefixes.some((prefix) => pathname.startsWith(prefix));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileTvetOpen, setMobileTvetOpen] = useState(false);
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
        <Link href="/" className="flex items-center">
          <Image
            src={transparent ? "/assets/logos/logo-2.svg" : "/assets/logos/logo-1.svg"}
            alt="NS-VTC"
            width={180}
            height={60}
            priority
            className="h-12 w-auto"
          />
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
                  <div className="absolute left-1/2 top-full mt-3 flex -translate-x-1/2 rounded-xl border border-border bg-white shadow-lg overflow-hidden">
                    {/* Training Areas column */}
                    <div className="w-52 p-3">
                      <p className="px-2 font-body text-[11px] font-bold uppercase tracking-widest text-muted mb-1">
                        Training Areas
                      </p>
                      {trainingAreas.map((area) => (
                        <Link
                          key={area.href}
                          href={area.href}
                          onClick={() => setDropdownOpen(false)}
                          onMouseEnter={() => setHoveredArea(area.label)}
                          className={`flex items-center justify-between rounded-control px-2 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-navy ${
                            hoveredArea === area.label ? "bg-surface text-navy" : ""
                          }`}
                        >
                          {area.label}
                          {area.subItems.length > 0 && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Sub-items panel */}
                    {(() => {
                      const active = trainingAreas.find((a) => a.label === hoveredArea);
                      if (!active || active.subItems.length === 0) return null;
                      return (
                        <div className="w-48 border-l border-border bg-surface/40 p-3">
                          <p className="px-2 font-body text-[11px] font-bold uppercase tracking-widest text-muted mb-1">
                            {active.label}
                          </p>
                          {active.subItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setDropdownOpen(false)}
                              className="block rounded-control px-2 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-navy"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      );
                    })()}
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
                  {/* Programs accordion toggle */}
                  <button
                    type="button"
                    onClick={() => setMobileProgramsOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-control px-2 py-3 font-body text-base font-medium text-ink transition-colors hover:bg-surface"
                  >
                    {link.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${mobileProgramsOpen ? "rotate-180" : ""}`}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {mobileProgramsOpen && (
                    <div className="ml-4 flex flex-col border-l border-border pl-3">
                      {trainingAreas.map((area) => (
                        <div key={area.href}>
                          {area.subItems.length > 0 ? (
                            /* TVET — nested accordion */
                            <>
                              <button
                                type="button"
                                onClick={() => setMobileTvetOpen((v) => !v)}
                                className="flex w-full items-center justify-between py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:text-navy"
                              >
                                {area.label}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${mobileTvetOpen ? "rotate-180" : ""}`}>
                                  <path d="m6 9 6 6 6-6" />
                                </svg>
                              </button>
                              {mobileTvetOpen && (
                                <div className="ml-3 flex flex-col border-l border-border pl-3">
                                  {area.subItems.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-2 text-sm font-medium text-muted transition-colors hover:text-navy"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            /* HSE & Corporate — plain links */
                            <Link
                              href={area.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:text-navy"
                            >
                              {area.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
