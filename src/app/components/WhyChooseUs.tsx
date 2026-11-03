"use client";

import { motion } from "motion/react";
import { LinkButton } from "./Button";

const reasons = [
  {
    tag: "Learning",
    title: "Practical Learning",
    description: "Hands-on training, demonstrations and practical exercises that build real confidence.",
    icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />,
  },
  {
    tag: "Growth",
    title: "Professional Development",
    description: "Build technical knowledge and confidence for your future career.",
    icon: <path d="M21.4 10.9a1 1 0 0 0 0-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0zM22 10v6M6 12.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-3.5" />,
  },
  {
    tag: "Safety",
    title: "Safety-Focused Training",
    description: "Learn safe working practices and accident prevention from day one.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3ZM9 12l2 2 4-4" />,
  },
  {
    tag: "Career",
    title: "Career Preparation",
    description: "Skills that support employment and self-employment opportunities.",
    icon: <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />,
  },
  {
    tag: "Community",
    title: "Supportive Environment",
    description: "An environment that encourages discipline, teamwork and growth.",
    icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  },
  {
    tag: "Living",
    title: "Accommodation Available",
    description: "Accommodation arrangements available for both male and female trainees.",
    icon: <path d="m3 12 9-8 9 8M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10" />,
  },
];

const row = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function WhyChooseUs() {
  return (
    <section className="bg-navy-dark px-4 py-16 sm:px-8 sm:py-20">
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
            Why NS-VTC
          </p>
          <h2 className="mt-3 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-white">
            A Place Built For Your Growth
          </h2>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-on-navy/70">
            From hands-on training to a safe, supportive campus, every part of NS-VTC is designed to get you job-ready.
          </p>
          <div className="mt-8">
            <LinkButton href="/register" variant="primary">
              Enroll Now
            </LinkButton>
          </div>
        </motion.div>

        {/* Scrolling right list */}
        <div className="relative">
          <div className="absolute bottom-5 left-5 top-5 w-px bg-white/10" aria-hidden="true">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="h-full w-full bg-white/30"
            />
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.12 }}
            className="flex flex-col gap-10"
          >
            {reasons.map((reason) => (
              <motion.li
                key={reason.title}
                variants={row}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex gap-5"
              >
                <span className="relative z-10 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy-dark text-orange ring-1 ring-white/10">
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
                    {reason.icon}
                  </svg>
                </span>
                <div className="pb-1">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-orange">
                    {reason.tag}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-on-navy/70">
                    {reason.description}
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
