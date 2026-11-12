"use client";

import { useState } from "react";
import { LinkButton } from "./Button";
import { faqs } from "../constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="mt-4 max-w-xs font-body text-sm leading-[1.6] text-muted">
            Everything you need to know about training, admissions and
            accommodation at NS-VTC.
          </p>
          <div className="mt-8">
            <LinkButton href="#contact" variant="accent">
              Contact Us
            </LinkButton>
          </div>
        </div>

        <ul className="flex flex-col">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <li key={faq.question} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex min-h-12 w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                >
                  <span
                    className={`font-heading text-base font-bold transition-colors ${
                      open ? "text-navy" : "text-ink"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`flex-none transition-all duration-200 ${
                      open ? "rotate-180 text-navy" : "text-muted"
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 font-body text-[15px] leading-[1.6] text-body">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
