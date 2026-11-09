import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../../../components/PageHero";
import Reveal from "../../../components/Reveal";
import RevealGroup from "../../../components/RevealGroup";
import RevealItem from "../../../components/RevealItem";
import AdmissionSections from "../../../components/AdmissionSections";
import { tvetCourses } from "../../../constants";

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
              Hands-on trade training in construction, metalwork, woodworking and garment production combining theory with practical exercises.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {tvetCourses.map((course) => (
              <RevealItem key={course.slug}>
                <Link
                  href={`/programs/${course.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="pointer-events-none absolute -right-2 -top-2 z-10 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {patternCells.map((op, i) => (
                      <span key={i} className="h-2.5 w-2.5 rounded-xs bg-white" style={{ opacity: op }} />
                    ))}
                  </div>

                  <div className="relative h-48 w-full flex-none">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                  </div>

                  <div className="relative flex flex-1 flex-col gap-3 bg-surface p-6 transition-colors duration-200 group-hover:bg-ink/5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-base font-bold text-ink">
                        {course.title}
                      </h3>
                      {course.duration ? (
                        <span className="rounded-full bg-navy/10 px-2 py-0.5 font-body text-xs font-semibold text-navy">
                          {course.duration}
                        </span>
                      ) : (
                        <span className="rounded-full border border-dashed border-border px-2 py-0.5 font-body text-xs font-semibold text-muted">
                          Duration TBC
                        </span>
                      )}
                    </div>

                    <p className="relative font-body text-xs leading-relaxed text-muted">
                      {course.tagline}
                    </p>

                    <span className="relative mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:underline">
                      Apply Now &rarr;
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <AdmissionSections applyHref="/register" applyLabel="Enroll Now" />

    </main>
  );
}
