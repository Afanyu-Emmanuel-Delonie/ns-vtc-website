import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import RevealGroup from "../../../components/RevealGroup";
import RevealItem from "../../../components/RevealItem";
import { LinkButton } from "../../../components/Button";
import { tvetCourses, getCourse } from "../data";
import AdmissionSections from "../../../components/AdmissionSections";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tvetCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} Training | NS-VTC`,
    description: course.tagline,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const otherCourses = tvetCourses.filter((c) => c.slug !== course.slug);

  return (
    <main>
      {/* Course Header */}
      <section className="relative overflow-hidden bg-navy-dark pb-0 pt-28">
        {/* dot pattern */}
        <div className="pointer-events-none absolute -right-4 -top-4 grid grid-cols-6 gap-1.5" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const d = row + (5 - col);
            const o = Math.max(0, 1 - d * 0.12) * 0.4;
            return <span key={i} className="h-3 w-3 rounded-xs bg-white" style={{ opacity: o }} />;
          })}
        </div>

        <div className="relative z-10 mx-auto max-w-(--container-site) px-4 sm:px-8">
          {/* Back link */}
          <Link
            href="/programs/tvet"
            className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            All TVET Courses
          </Link>

          {/* Main header row */}
          <div className="mt-6 flex flex-col gap-8 pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-5">
              <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white/10 text-orange ring-1 ring-white/10">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {course.icon}
                </svg>
              </span>
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-widest text-orange">TVET Training</span>
                <h1 className="mt-1 font-heading text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] text-white">
                  {course.title}
                </h1>
                <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-white/60">{course.tagline}</p>
              </div>
            </div>

            {/* Meta + CTA */}
            <div className="flex flex-col gap-3 lg:items-end">
              <div className="flex flex-wrap gap-2">
                {course.duration ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 font-body text-xs font-semibold text-white">
                    ⏱ {course.duration}
                  </span>
                ) : (
                  <span className="rounded-full border border-dashed border-white/20 px-3 py-1 font-body text-xs font-semibold text-white/50">
                    Duration TBC
                  </span>
                )}
                <span className="rounded-full bg-white/10 px-3 py-1 font-body text-xs font-semibold text-white">
                  📍 Bugesera, Rwanda
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 font-body text-xs font-semibold text-white">
                  🎓 Certificate Awarded
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <LinkButton href={`/register?course=${encodeURIComponent(course.registerLabel)}`} variant="accent">
                  Apply for this Course
                </LinkButton>
                <LinkButton href="/programs/tvet" variant="secondaryOnDark">
                  All TVET Courses
                </LinkButton>
              </div>
            </div>
          </div>

          {/* Stat bar */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-xl border-x border-t border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              { label: "Training Areas", value: `${course.areas.length} Topics` },
              { label: "Career Pathways", value: `${course.careers.length} Roles` },
              { label: "Delivery", value: "Practical & Theory" },
              { label: "Intake", value: "Rolling Enrolment" },
            ].map((stat) => (
              <div key={stat.label} className="bg-navy-dark px-5 py-4">
                <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-white/40">{stat.label}</p>
                <p className="mt-1 font-heading text-sm font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

            {/* What You'll Learn */}
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-orange">Training Areas</p>
              <h2 className="mt-2 font-heading text-xl font-bold text-ink">What You&rsquo;ll Learn</h2>
              <RevealGroup className="mt-6 flex flex-col gap-2">
                {course.areas.map((area, i) => (
                  <RevealItem key={area}>
                    <div className="flex items-start gap-3 rounded-control bg-surface px-4 py-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="font-body text-sm text-ink">{area}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>

            {/* Career Pathways */}
            <Reveal delay={0.1}>
              <p className="text-xs font-bold uppercase tracking-widest text-orange">Career Opportunities</p>
              <h2 className="mt-2 font-heading text-xl font-bold text-ink">Where It Can Take You</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {course.careers.map((career) => (
                  <li
                    key={career}
                    className="rounded-full border border-border bg-surface px-4 py-2 font-body text-sm text-ink"
                  >
                    {career}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-body text-xs leading-relaxed text-muted">
                Career pathways are indicative and depend on experience, qualifications and employer requirements.
              </p>

              {/* Apply CTA card */}
              <div className="mt-8 rounded-card bg-navy-dark p-6">
                <p className="font-heading text-base font-bold text-white">Ready to get started?</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-white/60">Applications are open. Secure your place on the next intake.</p>
                <div className="mt-4">
                  <LinkButton href={`/register?course=${encodeURIComponent(course.registerLabel)}`} variant="accent" className="w-full">
                    Apply for this Course
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AdmissionSections applyHref={`/register?course=${encodeURIComponent(course.registerLabel)}`} applyLabel="Apply for this Course" />

      <section className="border-t border-border bg-surface px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-orange">Explore More</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Other TVET Courses</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {otherCourses.map((c) => (
              <Link
                key={c.slug}
                href={`/programs/${c.slug}`}
                className="group flex flex-col gap-3 rounded-card bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-navy transition-colors group-hover:bg-white/10 group-hover:text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {c.icon}
                  </svg>
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{c.title}</p>
                  <p className="mt-0.5 font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
