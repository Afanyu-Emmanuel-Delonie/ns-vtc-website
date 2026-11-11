"use client";

import Image from "next/image";
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
    href: "/register?course=Scaffolding",
    title: "Scaffolding",
    duration: null,
    description: "Learn to safely erect, dismantle and inspect scaffolding structures used on construction sites, with a strong focus on working at heights and fall prevention.",
    image: "/assets/courses/scaffolding.jpg",
  },
  {
    href: "/register?course=Steel+Fixing",
    title: "Steel Fixing",
    duration: null,
    description: "Master the cutting, bending, placing and tying of reinforcement steel to prepare structural frameworks for concrete construction projects.",
    image: "/assets/courses/steel-fixing.jpg",
  },
  {
    href: "/register?course=Tailoring+(6+Months)",
    title: "Tailoring",
    duration: "6 Months",
    description: "Develop garment-making skills from taking measurements and pattern cutting through to operating sewing machines and producing finished clothing.",
    image: "/assets/courses/tailoring.jpg",
  },
  {
    href: "/register?course=Welding+(6+Months)",
    title: "Welding",
    duration: "6 Months",
    description: "Gain hands-on experience in metal fabrication, welding joints, cutting and workshop safety, building the skills needed for a career in metalwork.",
    image: "/assets/courses/welding.jpg",
  },
  {
    href: "/register?course=Carpentry",
    title: "Carpentry",
    duration: null,
    description: "Learn woodworking fundamentals including measuring, cutting, joining and finishing, covering furniture construction, door fitting and workshop safety.",
    image: "/assets/courses/carpentry.jpg",
  },
  {
    href: "/register?course=Painting",
    title: "Painting",
    duration: null,
    description: "Build professional painting skills covering surface preparation, paint mixing, interior and exterior application, and decorative finishing techniques.",
    image: "/assets/courses/painting.jpg",
  },
  {
    href: "/register?course=HSE+Training+(3+Months)",
    title: "HSE",
    duration: "3 Months",
    description: "Understand workplace health, safety and environmental responsibilities, covering hazard identification, PPE, fire safety and accident prevention.",
    image: "/assets/courses/hse.jpg",
  },
  {
    href: "/register?course=Masonry+(3+Months)",
    title: "Masonry",
    duration: "3 Months",
    description: "Learn bricklaying, block laying, mortar mixing, plastering and site preparation, practical skills for a career in building and construction.",
    image: "/assets/courses/masonry.jpg",
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
                className="group relative flex h-full flex-col overflow-hidden rounded-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="pointer-events-none absolute -right-2 -top-2 z-10 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {patternCells.map((opacity, i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-xs bg-white" style={{ opacity }} />
                  ))}
                </div>

                <div className="relative h-44 w-full flex-none">
                  <Image src={c.image} alt={c.title} fill className="object-cover" />
                </div>

                <div className="flex flex-1 flex-col gap-3 bg-surface p-5 transition-colors duration-200 group-hover:bg-ink/5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-base font-bold text-ink transition-colors group-hover:text-ink">
                      {c.title}
                    </h3>
                    {c.duration ? (
                      <span className="rounded-full bg-navy/10 px-2 py-0.5 font-body text-xs font-semibold text-navy transition-colors">
                        {c.duration}
                      </span>
                    ) : (
                      <span className="rounded-full border border-dashed border-border px-2 py-0.5 font-body text-xs font-semibold text-muted">
                        Duration TBC
                      </span>
                    )}
                  </div>

                  <p className="font-body text-xs leading-relaxed text-muted">
                    {c.description}
                  </p>

                  <span className="mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:underline">
                    Apply for this Course &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
