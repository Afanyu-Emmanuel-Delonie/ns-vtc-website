"use client";

import { useState } from "react";

type Props = {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
};

export default function CourseSelect({
  label,
  name,
  options,
  defaultValue,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue ?? options[0]);
  const labelId = `${name}-label`;

  return (
    <div>
      <label
        id={labelId}
        className="mb-1.5 block font-body text-sm font-medium text-ink"
      >
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={labelId}
          className="flex min-h-11 w-full items-center justify-between gap-2 rounded-control border border-border bg-white px-3 text-left font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          <span>{selected}</span>
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
            className={`flex-none text-muted transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            aria-labelledby={labelId}
            className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-auto rounded-card border border-border bg-white py-1"
          >
            {options.map((option) => (
              <li key={option} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected === option}
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center px-3 py-2 text-left font-body text-sm transition-colors hover:bg-surface ${
                    selected === option
                      ? "font-semibold text-navy"
                      : "text-ink"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input type="hidden" name={name} value={selected} />
    </div>
  );
}
