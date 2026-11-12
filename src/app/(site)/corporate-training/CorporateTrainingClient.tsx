"use client";

import { motion } from "motion/react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import RevealGroup from "../../components/RevealGroup";
import RevealItem from "../../components/RevealItem";
import { LinkButton } from "../../components/Button";
import AdmissionSections from "../../components/AdmissionSections";

const corporateAreas = [
  { title: "Occupational Health and Safety", description: "Support employees in understanding workplace hazards, risk prevention, PPE and safe working procedures.", icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" /> },
  { title: "Construction Safety", description: "Develop awareness of construction site hazards, working at heights, scaffolding safety and general site safety practices.", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /> },
  { title: "Fire Safety and Emergency Preparedness", description: "Improve employee awareness of fire prevention, evacuation procedures and emergency response.", icon: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z" /> },
  { title: "Workplace Risk Assessment", description: "Introduce employees to hazard identification, risk assessment and appropriate preventive measures.", icon: <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01" /> },
  { title: "Technical Skills Development", description: "Support workforce development through practical training in scaffolding, steel fixing, welding, masonry, carpentry and painting.", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /> },
  { title: "Employee Skills Improvement", description: "Provide opportunities for employees to improve their technical knowledge, practical competence and professional confidence.", icon: <path d="M21.4 10.9a1 1 0 0 0 0-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0zM22 10v6M6 12.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-3.5" /> },
];

const whoCanBenefit = [
  { tag: "Construction", title: "Construction & Engineering", description: "Companies and contractors operating on construction sites who need to build a safety-aware workforce.", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /> },
  { tag: "Industry", title: "Manufacturing Industries", description: "Factories and production facilities looking to reduce workplace incidents and improve employee competence.", icon: <path d="M3 21h18M6 21V8a1 1 0 0 1 1-1h3v14M14 21V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v17M9 11h.01M9 15h.01" /> },
  { tag: "Development", title: "NGOs & Development Organisations", description: "Non-governmental and development organisations seeking to train field staff on safety and risk management.", icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
  { tag: "Government", title: "Government Institutions", description: "Public sector bodies and institutions that require structured safety and skills training for their workforce.", icon: <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" /> },
  { tag: "Business", title: "Private Businesses", description: "Any private organisation seeking to improve employee skills, safety awareness and professional development.", icon: <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /> },
];

const process = [
  { step: "01", title: "Training Needs Assessment", description: "We work with your organisation to understand your workforce's current skill gaps and safety challenges." },
  { step: "02", title: "Training Planning", description: "A tailored training plan is developed based on your organisation's specific needs, schedule and objectives." },
  { step: "03", title: "Training Delivery", description: "Practical, engaging training sessions delivered by experienced instructors at your site or our campus." },
  { step: "04", title: "Evaluation and Feedback", description: "We assess training outcomes and gather feedback to measure effectiveness and identify improvements." },
  { step: "05", title: "Follow-Up", description: "Post-training support to ensure knowledge is retained and applied in the workplace." },
];

const row = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function CorporateTrainingClient() {
  return (
    <main>
      <PageHero
        eyebrow="For Organisations"
        title="Corporate Training"
        description="Building competent teams. Creating safer workplaces. Professional training for companies, contractors and institutions."
        actions={[
          { href: "/#contact", label: "Request Training", variant: "accent" },
          { href: "/programs", label: "View All Programs", variant: "secondaryOnDark" },
        ]}
      />

      {/* Training Areas */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-orange">What We Cover</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Training Areas</h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              We recognise that a skilled workforce is essential for productivity, efficiency and safety. Our training is tailored to your organisation&rsquo;s needs.
            </p>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {corporateAreas.map((area) => (
              <RevealItem key={area.title}>
                <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {area.icon}
                    </svg>
                  </span>
                  <p className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{area.title}</p>
                  <p className="font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">{area.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who Can Benefit */}
      <section className="bg-navy-dark px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange">Who Can Benefit</p>
            <h2 className="mt-3 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-white">
              Is Your Organisation Eligible?
            </h2>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-on-navy/70">
              Our corporate training is designed for any organisation that wants to build a safer, more skilled and more confident workforce.
            </p>
            <div className="mt-8">
              <LinkButton href="/#contact" variant="primary">Request Training</LinkButton>
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
              {whoCanBenefit.map((item) => (
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

      {/* Our Process */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">How It Works</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((item) => (
              <RevealItem key={item.step}>
                <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md">
                  <span className="font-heading text-3xl font-extrabold text-navy/10 transition-colors group-hover:text-white/10">{item.step}</span>
                  <p className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{item.title}</p>
                  <p className="font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 text-center">
            <LinkButton href="/#contact" variant="accent">Request Corporate Training</LinkButton>
          </Reveal>
        </div>
      </section>

      <AdmissionSections applyHref="/#contact" applyLabel="Request Corporate Training" />
    </main>
  );
}
