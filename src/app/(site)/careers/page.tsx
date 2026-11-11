"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import RevealGroup from "../../components/RevealGroup";
import RevealItem from "../../components/RevealItem";
import { LinkButton } from "../../components/Button";
import { CONTACT, deptColors } from "../../constants";

type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  archived: boolean;
};

const row = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

const partnerships = [
  { tag: "Workforce", title: "Access to Skilled Workers", description: "Employers gain access to trained, job-ready graduates across our TVET, HSE and corporate programs.", icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
  { tag: "Learning", title: "Practical Learning Opportunities", description: "We work with partners to support hands-on, real-world learning experiences for our trainees.", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /> },
  { tag: "Exposure", title: "Internship & Workplace Exposure", description: "Partner organisations can offer internship or workplace exposure opportunities to our trainees.", icon: <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /> },
  { tag: "Collaboration", title: "Workforce Development", description: "We collaborate with employers and industry partners on long-term workforce development initiatives.", icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" /> },
  { tag: "Insight", title: "Industry Skills Requirements", description: "Partners share their industry skills requirements, helping us keep our training relevant.", icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 6v6m0 4h.01" /> },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(query(collection(db, "jobs"), where("archived", "==", false), orderBy("title")));
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Job)));
      setLoadingJobs(false);
    }
    load();
  }, []);
  return (
    <main>
      <PageHero
        eyebrow="Careers at NS-VTC"
        title="Shape Your Career"
        description="Join a team dedicated to transforming lives through practical skills training. Explore open positions at NS-VTC or find out how your organisation can partner with us on workforce development."
        actions={[
          { href: "#positions", label: "View Open Positions", variant: "accent" },
          { href: "#partnerships", label: "Partner With Us", variant: "secondaryOnDark" },
        ]}
      />

      {/* Open Positions */}
      <section id="positions" className="scroll-mt-24 px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">Open Positions</h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              We&rsquo;re looking for passionate professionals to help us deliver world-class vocational training.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loadingJobs ? (
              <p className="col-span-3 font-body text-sm text-muted">Loading positions...</p>
            ) : jobs.length === 0 ? (
              <p className="col-span-3 font-body text-sm text-muted">No open positions at this time. Check back soon.</p>
            ) : jobs.map((pos) => (
              <RevealItem key={pos.id}>
                <div className="group flex h-full flex-col rounded-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide ${deptColors[pos.department] ?? "bg-surface text-muted"}`}>
                      {pos.department}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 font-body text-[11px] font-medium text-muted">
                      {pos.type}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-ink">{pos.title}</h3>
                  <p className="mt-1 font-body text-xs text-muted">📍 {pos.location}</p>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted">{pos.description}</p>
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {(pos.requirements ?? []).map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                        <span className="font-body text-xs text-muted">{req}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <LinkButton href={`/careers/${pos.id}`} variant="accent" className="w-full">View Details</LinkButton>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 rounded-card border border-dashed border-border bg-surface p-6 text-center">
            <p className="font-heading text-sm font-bold text-ink">Don&rsquo;t see a match?</p>
            <p className="font-body text-sm leading-relaxed text-muted">
              Send an open application to{" "}
              <a href={CONTACT.emailHref} className="font-semibold text-navy hover:underline">{CONTACT.email}</a>
              {" "}and we&rsquo;ll keep it on file.
            </p>
            <LinkButton href={`${CONTACT.emailHref}?subject=Open%20Application%20-%20NS-VTC`} variant="accent">
              Send Your CV
            </LinkButton>
          </Reveal>
        </div>
      </section>

      {/* Employer & Industry Partnerships */}
      <section id="partnerships" className="scroll-mt-24 bg-navy-dark px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-white">
              Employer & Industry Partnerships
            </h2>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-on-navy/70">
              We welcome partnerships with companies and institutions interested in vocational skills development, employee training and workplace safety.
            </p>
            <div className="mt-8">
              <LinkButton href="/#contact" variant="accent">Partner With Us</LinkButton>
            </div>
          </motion.div>

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
              {partnerships.map((item) => (
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
    </main>
  );
}
