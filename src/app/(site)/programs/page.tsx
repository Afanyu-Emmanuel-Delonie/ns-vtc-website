import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import RevealGroup from "../../components/RevealGroup";
import RevealItem from "../../components/RevealItem";
import { LinkButton } from "../../components/Button";
import AdmissionSections from "../../components/AdmissionSections";
import { tvetCourses } from "../../constants";

export const metadata: Metadata = {
  title: "Programs | NS-VTC",
  description: "Explore TVET, HSE and Corporate Training programs at Newton Safety and Vocational Training Center.",
};

const patternCells = Array.from({ length: 25 }, (_, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;
  return Math.max(0, 1 - (row + (4 - col)) * 0.16);
});

const categories = [
  {
    href: "/programs/tvet",
    label: "TVET Training",
    desc: "Trade-based courses in construction, metalwork, woodworking and garment production.",
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  },
  {
    href: "/programs/hse",
    label: "HSE Training",
    desc: "Workplace safety, hazard identification, risk assessment and emergency preparedness.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 6v6m0 4h.01" />,
  },
  {
    href: "/corporate-training",
    label: "Corporate Training",
    desc: "Build employee competence and workplace safety awareness for your organisation.",
    icon: <path d="M3 21h18M6 21V8a1 1 0 0 1 1-1h3v14M14 21V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v17M9 11h.01M9 15h.01" />,
  },
];

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="flex flex-col items-center text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-orange">{eyebrow}</span>
      <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
    </Reveal>
  );
}

export default function ProgramsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Programs"
        title="Training That Opens Doors"
        description="Practical, industry-aligned vocational and safety training programs designed to prepare you for employment, entrepreneurship and professional growth."
        actions={[
          { href: "/register", label: "Enroll Now", variant: "accent" },
          { href: "/#contact", label: "Ask a Question", variant: "secondaryOnDark" },
        ]}
      />

      {/* Overview — 3 program type cards */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <SectionHeader eyebrow="What We Offer" title="Our Training Programs" />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {categories.map((p) => (
              <RevealItem key={p.href}>
                <Link href={p.href} className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-card bg-surface p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md">
                  <div className="pointer-events-none absolute -right-2 -top-2 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {patternCells.map((op, i) => <span key={i} className="h-2.5 w-2.5 rounded-xs bg-white" style={{ opacity: op }} />)}
                  </div>
                  <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p.icon}</svg>
                  </span>
                  <h3 className="relative font-heading text-base font-bold text-ink transition-colors group-hover:text-white">{p.label}</h3>
                  <p className="relative font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">{p.desc}</p>
                  <span className="relative mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:text-white group-hover:underline">View Program →</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Quick access — all TVET courses */}
      <section className="border-t border-border bg-surface px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <SectionHeader eyebrow="Browse by Course" title="All TVET Courses" />
          <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {tvetCourses.map((course) => (
              <RevealItem key={course.slug}>
                <Link
                  href={`/programs/${course.slug}`}
                  className="group flex h-full flex-col items-center gap-2 rounded-card bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="inline-flex h-9 w-9 overflow-hidden rounded-full bg-surface">
                    <Image src={course.image} alt={course.title} width={36} height={36} className="h-full w-full object-cover" />
                  </span>
                  <span className="font-body text-xs font-semibold text-ink">
                    {course.title}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 text-center">
            <LinkButton href="/programs/tvet" variant="secondary">See Full TVET Details</LinkButton>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <Reveal className="mx-auto flex max-w-(--container-site) flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange">Take the First Step</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Ready to Start Training?</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">Fill in the registration form and our team will get back to you with intake details and your start date.</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/register" variant="accent">Register Now</LinkButton>
            <LinkButton href="/#contact" variant="secondary">Contact Us First</LinkButton>
          </div>
        </Reveal>
      </section>

      <AdmissionSections applyHref="/register" applyLabel="Register Now" />
    </main>
  );
}
