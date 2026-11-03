"use client";

import { motion } from "motion/react";
import { LinkButton } from "./Button";

const steps = [
  {
    number: "01",
    title: "Theory",
    description: "Understand the fundamentals\nbefore stepping into the workshop.",
    cx: 40, cy: 420,
    labelX: 40, labelY: 460, anchor: "middle" as const,
  },
  {
    number: "02",
    title: "Demonstration",
    description: "Observe professional techniques\nperformed by expert trainers.",
    cx: 230, cy: 330,
    labelX: 230, labelY: 370, anchor: "middle" as const,
  },
  {
    number: "03",
    title: "Practice",
    description: "Develop skills through hands-on,\nsupervised practical work.",
    cx: 380, cy: 190,
    labelX: 390, labelY: 150, anchor: "start" as const,
  },
  {
    number: "04",
    title: "Career Preparation",
    description: "Prepare for employment,\ncertification and real opportunities.",
    cx: 540, cy: 80,
    labelX: 540, labelY: 40, anchor: "middle" as const,
  },
];

export default function TrainingApproach() {
  return (
    <section className="overflow-hidden bg-white px-[clamp(16px,5vw,64px)] py-[clamp(56px,7vw,96px)]">
      <div className="mx-auto grid max-w-(--container-site) items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-xs font-bold uppercase tracking-widest text-orange">
            Our Training Approach
          </p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Learn. Practice. Develop. Succeed.
          </h2>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-body">
            Every NS-VTC program follows the same proven path — from
            classroom fundamentals to real, career-ready skills.
          </p>
          <div className="mt-8">
            <LinkButton href="/#contact" variant="accent">
              Get Started
            </LinkButton>
          </div>
        </motion.div>

        <div className="relative w-full">
          <svg
            viewBox="0 0 600 560"
            fill="none"
            className="w-full"
            aria-hidden="true"
          >
            {/* curve */}
            <motion.path
              d="M40,420 C120,420 140,380 230,330 C300,290 300,250 380,190 C440,145 460,110 540,80"
              stroke="var(--color-orange)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />

            {steps.map((step, i) => (
              <motion.g
                key={step.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.25 }}
              >
                {/* dot circle */}
                <circle cx={step.cx} cy={step.cy} r="18" fill="white" filter="url(#shadow)" />
                <circle cx={step.cx} cy={step.cy} r="6" fill="var(--color-border)" />

                {/* step number */}
                <text
                  x={step.cx}
                  y={step.cy - 24}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--color-orange)"
                  fontFamily="inherit"
                >
                  {step.number}
                </text>

                {/* title */}
                <text
                  x={step.labelX}
                  y={step.labelY}
                  textAnchor={step.anchor}
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--color-ink)"
                  fontFamily="inherit"
                >
                  {step.title}
                </text>

                {/* description lines */}
                {step.description.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={step.labelX}
                    y={step.labelY + 16 + li * 14}
                    textAnchor={step.anchor}
                    fontSize="11"
                    fill="var(--color-muted)"
                    fontFamily="inherit"
                  >
                    {line}
                  </text>
                ))}
              </motion.g>
            ))}

            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
