"use client";

import { motion } from "motion/react";
import { LinkButton } from "./Button";

const steps = [
  {
    tag: "Step 01",
    title: "Theory",
    description: "Understand the fundamentals before stepping into the workshop.",
    icon: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2Z" />,
  },
  {
    tag: "Step 02",
    title: "Demonstration",
    description: "Observe professional techniques performed by expert trainers.",
    icon: <path d="M3 4h18v12H3zM8 20h8M12 16v4" />,
  },
  {
    tag: "Step 03",
    title: "Practice",
    description: "Develop skills through hands-on, supervised practical work.",
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  },
  {
    tag: "Step 04",
    title: "Career Preparation",
    description: "Prepare for employment, certification and real opportunities.",
    icon: <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />,
  },
];

const row = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function TrainingApproach() {
  return (
    <section className="bg-surface px-4 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">

        {/* Sticky left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange">
            Our Training Approach
          </p>
          <h2 className="mt-3 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
            Learn. Practice. Develop. Succeed.
          </h2>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-body">
            Every NS-VTC program follows the same proven path from classroom fundamentals to real, career-ready skills.
          </p>
          <div className="mt-8">
            <LinkButton href="/#contact" variant="accent">
              Get Started
            </LinkButton>
          </div>
        </motion.div>

        {/* Scrolling right list */}
        <div className="relative">
          <div className="absolute bottom-5 left-5 top-5 w-px bg-border" aria-hidden="true">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="h-full w-full bg-orange/50"
            />
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.12 }}
            className="flex flex-col gap-10"
          >
            {steps.map((step) => (
              <motion.li
                key={step.title}
                variants={row}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex gap-5"
              >
                <span className="relative z-10 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-border">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {step.icon}
                  </svg>
                </span>
                <div className="pb-1">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-orange">
                    {step.tag}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

      </div>
    </section>
  );
}
