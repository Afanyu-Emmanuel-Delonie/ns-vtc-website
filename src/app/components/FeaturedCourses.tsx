"use client";

import { motion } from "motion/react";
import Link from "next/link";

const patternCells = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => {
    const distance = row + (4 - col);
    return Math.max(0, 1 - distance * 0.16);
  })
).flat();

const courses = [
  {
    href: "/programs/scaffolding",
    title: "Scaffolding",
    duration: null,
    description: "Practical construction access and scaffolding skills.",
    icon: (
      <path d="M4 21V9m16 12V9M4 9h16M4 9l4-5h8l4 5M8 21v-6h8v6" />
    ),
  },
  {
    href: "/programs/steel-fixing",
    title: "Steel Fixing",
    duration: null,
    description: "Reinforcement steel preparation and installation.",
    icon: <path d="M4 20 20 4M4 4l16 16M9 4v5M4 9h5M15 20v-5M20 15h-5" />,
  },
  {
    href: "/programs/tailoring",
    title: "Tailoring",
    duration: "6 Months",
    description: "Garment making, sewing and clothing design skills.",
    icon: (
      <path d="M6 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM6 20a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM7.5 5.5 18 18M7.5 18.5 18 6" />
    ),
  },
  {
    href: "/programs/welding",
    title: "Welding",
    duration: "6 Months",
    description: "Metal fabrication and welding techniques.",
    icon: <path d="m3 21 7-7M10 14 20.5 3.5a1.5 1.5 0 0 1 2 2L12 16M14 7l3 3M6 16l2 2M3 21l2.5-1.5L3 17.5 2 21Z" />,
  },
  {
    href: "/programs/carpentry",
    title: "Carpentry",
    duration: null,
    description: "Woodworking, furniture making and construction skills.",
    icon: <path d="m14.5 2.5 7 7L9 22H2v-7Z M12.5 4.5l7 7" />,
  },
  {
    href: "/programs/painting",
    title: "Painting",
    duration: null,
    description: "Surface preparation and professional painting techniques.",
    icon: (
      <path d="M19 11h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2v3a2 2 0 1 1-4 0v-3H7a4 4 0 0 1-4-4V4h12v7Z" />
    ),
  },
  {
    href: "/programs/hse",
    title: "HSE",
    duration: "3 Months",
    description: "Workplace health, safety and environmental protection.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 6v6m0 4h.01" />,
  },
  {
    href: "/programs/masonry",
    title: "Masonry",
    duration: "3 Months",
    description: "Bricklaying, concrete work and building construction.",
    icon: (
      <path d="M3 21h18M4 21V11h7v10M11 21V11h9v10M7 11V5h9v6" />
    ),
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturedCourses() {
  return (
    <section className="border-t border-border px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto max-w-(--container-site)">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
            Our Featured Training Courses
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted sm:text-base">
            Eight hands-on programmes across construction, fabrication,
            garment production and workplace safety.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={grid}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {courses.map((c) => (
            <motion.div key={c.href} variants={card} transition={{ duration: 0.4, ease: "easeOut" }}>
              <Link
                href={c.href}
                className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-card bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md"
              >
                <div className="pointer-events-none absolute -right-2 -top-2 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {patternCells.map((opacity, i) => (
                    <span
                      key={i}
                      className="h-2.5 w-2.5 rounded-xs bg-white"
                      style={{ opacity }}
                    />
                  ))}
                </div>

                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm transition-colors group-hover:bg-white/10 group-hover:text-white">
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
                  >
                    {c.icon}
                  </svg>
                </span>

                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-base font-bold text-ink transition-colors group-hover:text-white">
                    {c.title}
                  </h3>
                  {c.duration ? (
                    <span className="rounded-full bg-navy/10 px-2 py-0.5 font-body text-xs font-semibold text-navy transition-colors group-hover:bg-white/10 group-hover:text-white">
                      {c.duration}
                    </span>
                  ) : (
                    <span className="rounded-full border border-dashed border-border px-2 py-0.5 font-body text-xs font-semibold text-muted group-hover:border-white/30 group-hover:text-white/60">
                      Duration TBC
                    </span>
                  )}
                </div>

                <p className="font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">
                  {c.description}
                </p>

                <span className="mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:text-white group-hover:underline">
                  Apply for this Course &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
