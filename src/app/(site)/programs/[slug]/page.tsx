import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import RevealGroup from "../../../components/RevealGroup";
import RevealItem from "../../../components/RevealItem";
import { LinkButton } from "../../../components/Button";
import { tvetCourses, getCourse } from "../../../constants";
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
        <div className="mx-auto max-w-(--container-site) flex flex-col gap-12">

          {/* What You'll Learn */}
          <Reveal>
            <h2 className="font-heading text-xl font-bold text-ink">What You&rsquo;ll Learn</h2>
            <p className="mt-1 font-body text-sm text-muted">Core topics and practical skills covered in this program.</p>
            <RevealGroup className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {course.areas.map((area) => (
                <RevealItem key={area}>
                  <div className="flex items-start gap-3 rounded-control border border-border bg-white px-4 py-3">
                    <svg className="mt-0.5 flex-none text-orange" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span className="font-body text-sm text-ink">{area}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          {/* Career Pathways */}
          <Reveal delay={0.1}>
            <div className="rounded-card bg-navy-dark p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">Where It Can Take You</h2>
                  <p className="mt-1 font-body text-sm text-white/60">Career pathways are indicative and depend on experience and employer requirements.</p>
                </div>
                <LinkButton href={`/register?course=${encodeURIComponent(course.registerLabel)}`} variant="accent" className="flex-none">
                  Apply for this Course
                </LinkButton>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {course.careers.map((career) => (
                  <li key={career} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-body text-sm font-medium text-white">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                    {career}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

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
                className="group flex flex-col overflow-hidden rounded-card bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md"
              >
                <div className="relative h-36 w-full flex-none">
                  <Image src={c.image} alt={c.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <p className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{c.title}</p>
                  <p className="font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
