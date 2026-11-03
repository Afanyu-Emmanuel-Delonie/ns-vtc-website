"use client";

import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "rw", label: "Kinyarwanda" },
  { code: "fr", label: "Français" },
];

export default function LanguageSwitcher({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          transparent
            ? "border-white/40 text-white hover:border-white focus-visible:ring-white"
            : "border-border text-ink hover:border-navy focus-visible:ring-navy"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
        </svg>
        {selected.code.toUpperCase()}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-40 rounded-card border border-border bg-white py-1 shadow-md"
        >
          {languages.map((lang) => (
            <li key={lang.code} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setSelected(lang);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-3 py-2 text-left font-body text-sm transition-colors hover:bg-surface ${
                  selected.code === lang.code
                    ? "font-semibold text-navy"
                    : "text-ink"
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
