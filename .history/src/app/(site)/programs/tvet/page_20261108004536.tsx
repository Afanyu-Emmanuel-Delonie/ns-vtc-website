import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../../components/PageHero";
import Reveal from "../../../components/Reveal";
import RevealGroup from "../../../components/RevealGroup";
import RevealItem from "../../../components/RevealItem";
import { LinkButton } from "../../../components/Button";
import { tvetCourses } from "../data";

export const metadata: Metadata = {
  title: "TVET Training | NS-VTC",
  description:
    "Practical trade-based courses in construction, metalwork, woodworking and garment production at Newton Safety and Vocational Training Center.",
};

const patternCells = Array.from({ length: 25 }, (_, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;
  return Math.max(0, 1 - (row + (4 - col)) * 0.16);
});

export default function TvetPage() {
  return (
    <main>
      <PageHero
        eyebrow="Technical & Vocational Education and Training"
        title="TVET Training"
        description="Turning practical skills into professional opportunities. Pick a trade below to see what you'll learn and where it can take you."
        actions={[
          { href: "/register", label: "Enroll Now", variant: "accent" },
          { href: "/#contact", label: "Ask a Question", variant: "secondaryOnDark" },
        ]}
      />

      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Choose Your Course</h2>
            
            <p className="mt-4 font-body text-sm leading-relaxed text-body">
              Hands-on trade training in construction, metalwork, woodworking and garment production — combining theory with practical exercises.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tvetCourses.map((course) => (
              <RevealItem key={course.slug}>
                <Link
                  href={`/programs/${course.slug}`}
                  className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md"
                >
                  <div className="pointer-events-none absolute -right-2 -top-2 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {patternCells.map((op, i) => (
                      <span key={i} className="h-2.5 w-2.5 rounded-xs bg-white" style={{ opacity: op }} />
                    ))}
                  </div>

                  <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {course.icon}
                    </svg>
                  </span>

                  <div className="relative flex items-center gap-2">
                    <h3 className="font-heading text-base font-bold text-ink transition-colors group-hover:text-white">
                      {course.title}
                    </h3>
                    {course.duration ? (
                      <span className="rounded-full bg-navy/10 px-2 py-0.5 font-body text-xs font-semibold text-navy transition-colors group-hover:bg-white/10 group-hover:text-white">
                        {course.duration}
                      </span>
                    ) : (
                      <span className="rounded-full border border-dashed border-border px-2 py-0.5 font-body text-xs font-semibold text-muted group-hover:border-white/30 group-hover:text-white/60">
                        Duration TBC
                      </span>
                    )}
                  </div>

                  <p className="relative font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">
                    {course.tagline}
                  </p>

                  <span className="relative mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:text-white group-hover:underline">
                    View Course &rarr;
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-border bg-surface px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <Reveal className="mx-auto flex max-w-(--container-site) flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange">Not Sure Which Trade?</span>
          <h2 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">Talk to Our Admissions Team</h2>
          <span className="block h-[3px] w-12 rounded-full bg-navy" aria-hidden="true" />
          <p className="max-w-md font-body text-sm leading-relaxed text-muted">
            Contact us and we&rsquo;ll help you choose the right course based on your interests and goals.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/register" variant="accent">Register Now</LinkButton>
            <LinkButton href="/#contact" variant="secondary">Contact Us First</LinkButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
