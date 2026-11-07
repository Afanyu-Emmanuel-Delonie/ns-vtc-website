"use client";

import type { Metadata } from "next";
import { motion } from "motion/react";
import PageHero from "../../../components/PageHero";
import Reveal from "../../../components/Reveal";
import RevealGroup from "../../../components/RevealGroup";
import RevealItem from "../../../components/RevealItem";
import { LinkButton } from "../../../components/Button";
import AdmissionSections from "../../../components/AdmissionSections";
import { hseTopics, whoShouldJoin, careerPathways, row } from "./constants";

export default function HsePage() {
  return (
    <main>
      <PageHero
        title="HSE Training"
        description="Promoting safer workplaces. Protecting lives. Building a safety culture."
        actions={[
          { href: "/register?course=HSE+Training+(3+Months)", label: "Apply for HSE", variant: "accent" },
          { href: "/#contact", label: "Ask a Question", variant: "secondaryOnDark" },
        ]}
      />

      {/* Topics */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">What You Will Learn</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {hseTopics.map((topic) => (
              <RevealItem key={topic.title}>
                <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {topic.icon}
                    </svg>
                  </span>
                  <p className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{topic.title}</p>
                  <p className="font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">{topic.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <AdmissionSections applyHref="/register?course=HSE+Training+(3+Months)" applyLabel="Apply for HSE" />


      {/* Who Should Join */}
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
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange">Who Should Join</p>
            <h2 className="mt-3 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-white">
              Is This Program For You?
            </h2>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-on-navy/70">
              HSE Training is open to anyone ready to build a foundation in workplace safety from beginners to experienced workers.
            </p>
            <div className="mt-8">
              <LinkButton href="/register?course=HSE+Training+(3+Months)" variant="primary">Apply Now</LinkButton>
            </div>
          </motion.div>

          {/* Scrolling list */}
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
              {whoShouldJoin.map((item) => (
                <motion.li
                  key={item.title}
                  variants={row}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative flex gap-5"
                >
                  <span className="relative z-10 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy-dark text-orange ring-1 ring-white/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </span>
                  <div className="pb-1">
                    <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-orange">{item.tag}</p>
                    <h3 className="mt-1 font-heading text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-1 font-body text-xs leading-relaxed text-on-navy/70">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Career Pathways */}
      <section className="bg-white px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-orange">After You Graduate</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Career Pathways</h2>
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {careerPathways.map((item) => (
              <span key={item} className="rounded-full border border-border bg-surface px-5 py-2.5 font-body text-sm font-medium text-ink">
                {item}
              </span>
            ))}
          </Reveal>
          <Reveal className="mt-8 text-center">
            <LinkButton href="/register?course=HSE+Training+(3+Months)" variant="accent">Apply for HSE Training</LinkButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
