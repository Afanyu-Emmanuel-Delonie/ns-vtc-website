import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import RevealGroup from "../../../components/RevealGroup";
import RevealItem from "../../../components/RevealItem";
import { LinkButton } from "../../../components/Button";
import { openPositions, getPosition, deptColors } from "../data";
import { CONTACT } from "../../../constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return openPositions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pos = getPosition(slug);
  if (!pos) return {};
  return {
    title: `${pos.title} | Careers at NS-VTC`,
    description: pos.description,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const pos = getPosition(slug);
  if (!pos) notFound();

  const applyHref = `${CONTACT.emailHref}?subject=Application%20-%20${encodeURIComponent(pos.title)}`;
  const otherPositions = openPositions.filter((p) => p.slug !== pos.slug);

  return (
    <main>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy-dark pb-0 pt-28">
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
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            All Positions
          </Link>

          <div className="mt-6 flex flex-col gap-8 pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide ${deptColors[pos.department] ?? "bg-white/10 text-white"}`}>
                  {pos.department}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-body text-[11px] font-medium text-white">
                  {pos.type}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-body text-[11px] font-medium text-white">
                  📍 {pos.location}
                </span>
              </div>
              <h1 className="mt-3 font-heading text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] text-white">
                {pos.title}
              </h1>
              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-white/60">{pos.description}</p>
            </div>

            <div className="flex flex-none flex-wrap gap-3 lg:flex-col lg:items-end">
              <LinkButton href={applyHref} variant="accent">Apply for this Role</LinkButton>
              <LinkButton href="/careers" variant="secondaryOnDark">All Positions</LinkButton>
            </div>
          </div>

          {/* Stat bar */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-xl border-x border-t border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              { label: "Department", value: pos.department },
              { label: "Contract", value: pos.type },
              { label: "Location", value: pos.location },
              { label: "Applications", value: "Open Now" },
            ].map((stat) => (
              <div key={stat.label} className="bg-navy-dark px-5 py-4">
                <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-white/40">{stat.label}</p>
                <p className="mt-1 font-heading text-sm font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">

            {/* Left — about the role + responsibilities */}
            <div className="flex flex-col gap-10">
              <Reveal>
                
                <h2 className="mt-2 font-heading text-xl font-bold text-ink">The Position</h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted">{pos.body}</p>
              </Reveal>

              <Reveal delay={0.1}>
               
                <h2 className="mt-2 font-heading text-xl font-bold text-ink">Key Responsibilities</h2>
                <ul className="mt-5 flex flex-col gap-2">
                  {pos.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                      <span className="font-body text-sm text-ink">{r}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.15}>
               
                <h2 className="mt-2 font-heading text-xl font-bold text-ink">Education & Credentials</h2>
                <ul className="mt-5 flex flex-col gap-2">
                  {pos.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                      <span className="font-body text-sm text-ink">{q}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right — requirements + apply card */}
            <div className="flex flex-col gap-8">
              <Reveal>
                
                <h2 className="mt-2 font-heading text-xl font-bold text-ink">Requirements</h2>
                <ul className="mt-6 flex flex-col gap-2">
                  {pos.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 rounded-control bg-surface px-4 py-3">
                      <svg className="mt-0.5 flex-none text-orange" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="font-body text-sm text-ink">{r}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Apply card */}
              <Reveal delay={0.1}>
                <div className="rounded-card bg-navy-dark p-6">
                  <p className="font-heading text-base font-bold text-white">Ready to apply?</p>
                  <p className="mt-2 font-body text-xs leading-relaxed text-white/60">
                    Send your CV and a short cover letter to{" "}
                    <a href={CONTACT.emailHref} className="font-semibold text-orange hover:underline">{CONTACT.email}</a>
                    {" "}with the subject line <span className="font-semibold text-white/80">&ldquo;Application – {pos.title}&rdquo;</span>.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <LinkButton href={applyHref} variant="accent" className="w-full">
                      Apply Now
                    </LinkButton>
                    <LinkButton href="/careers" variant="primary" className="w-full">
                      View All Positions
                    </LinkButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Other Open Positions */}
      {otherPositions.length > 0 && (
        <section className="border-t border-border bg-surface px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
          <div className="mx-auto max-w-(--container-site)">
            <Reveal className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-orange">Explore More</span>
              <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Other Open Positions</h2>
            
            </Reveal>

            <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {otherPositions.map((p) => (
                <RevealItem key={p.slug}>
                  <Link
                    href={`/careers/${p.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-card bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md"
                  >
                    <span className={`w-fit rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide ${deptColors[p.department] ?? "bg-surface text-navy"}`}>
                      {p.department}
                    </span>
                    <h3 className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{p.title}</h3>
                    <p className="font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">📍 {p.location}</p>
                    <span className="mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:text-white group-hover:underline">View Role &rarr;</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-8 text-center">
              <LinkButton href="/careers" variant="secondary">View All Positions</LinkButton>
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
