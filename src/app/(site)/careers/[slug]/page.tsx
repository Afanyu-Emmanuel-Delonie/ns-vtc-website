"use client";

export const dynamic = "force-static";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Reveal from "../../../components/Reveal";
import RevealGroup from "../../../components/RevealGroup";
import RevealItem from "../../../components/RevealItem";
import { LinkButton } from "../../../components/Button";
import { CONTACT, deptColors } from "../../../constants";

type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  body: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  archived: boolean;
};

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [others, setOthers] = useState<Job[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "jobs", slug));
      if (!snap.exists()) { setJob(null); return; }
      const j = { id: snap.id, ...snap.data() } as Job;
      setJob(j);
      const othersSnap = await getDocs(query(collection(db, "jobs"), where("archived", "==", false), orderBy("title")));
      setOthers(othersSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Job)).filter((o) => o.id !== j.id));
    }
    load();
  }, [slug]);

  if (job === undefined) {
    return <div className="flex min-h-screen items-center justify-center"><p className="font-body text-sm text-muted">Loading...</p></div>;
  }
  if (job === null) {
    return <div className="flex min-h-screen items-center justify-center"><p className="font-body text-sm text-muted">Position not found.</p></div>;
  }

  const applyHref = `${CONTACT.emailHref}?subject=Application%20-%20${encodeURIComponent(job.title)}`;

  return (
    <main>
      <section className="relative overflow-hidden bg-navy-dark pb-0 pt-28">
        <div className="pointer-events-none absolute -right-4 -top-4 grid grid-cols-6 gap-1.5" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => {
            const row = Math.floor(i / 6); const col = i % 6;
            const o = Math.max(0, 1 - (row + (5 - col)) * 0.12) * 0.4;
            return <span key={i} className="h-3 w-3 rounded-xs bg-white" style={{ opacity: o }} />;
          })}
        </div>

        <div className="relative z-10 mx-auto max-w-(--container-site) px-4 sm:px-8">
          <Link href="/careers" className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            All Positions
          </Link>

          <div className="mt-6 flex flex-col gap-8 pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide ${deptColors[job.department] ?? "bg-white/10 text-white"}`}>{job.department}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-body text-[11px] font-medium text-white">{job.type}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-body text-[11px] font-medium text-white">📍 {job.location}</span>
              </div>
              <h1 className="mt-3 font-heading text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] text-white">{job.title}</h1>
              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-white/60">{job.description}</p>
            </div>
            <div className="flex flex-none flex-wrap gap-3 lg:flex-col lg:items-end">
              <LinkButton href={applyHref} variant="accent">Apply for this Role</LinkButton>
              <LinkButton href="/careers" variant="secondaryOnDark">All Positions</LinkButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-xl border-x border-t border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              { label: "Department", value: job.department },
              { label: "Contract", value: job.type },
              { label: "Location", value: job.location },
              { label: "Applications", value: "Open Now" },
            ].map((s) => (
              <div key={s.label} className="bg-navy-dark px-5 py-4">
                <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-white/40">{s.label}</p>
                <p className="mt-1 font-heading text-sm font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-10">
              <Reveal>
                <h2 className="font-heading text-xl font-bold text-ink">The Position</h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted">{job.body}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-heading text-xl font-bold text-ink">Key Responsibilities</h2>
                <ul className="mt-5 flex flex-col gap-2">
                  {(job.responsibilities ?? []).map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                      <span className="font-body text-sm text-ink">{r}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.15}>
                <h2 className="font-heading text-xl font-bold text-ink">Education & Credentials</h2>
                <ul className="mt-5 flex flex-col gap-2">
                  {(job.qualifications ?? []).map((q) => (
                    <li key={q} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                      <span className="font-body text-sm text-ink">{q}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="flex flex-col gap-8">
              <Reveal>
                <h2 className="font-heading text-xl font-bold text-ink">Requirements</h2>
                <ul className="mt-6 flex flex-col gap-2">
                  {(job.requirements ?? []).map((r) => (
                    <li key={r} className="flex items-start gap-3 rounded-control bg-surface px-4 py-3">
                      <svg className="mt-0.5 flex-none text-orange" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="font-body text-sm text-ink">{r}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-card bg-navy-dark p-6">
                  <p className="font-heading text-base font-bold text-white">Ready to apply?</p>
                  <p className="mt-2 font-body text-xs leading-relaxed text-white/60">
                    Send your CV and a short cover letter to{" "}
                    <a href={CONTACT.emailHref} className="font-semibold text-orange hover:underline">{CONTACT.email}</a>
                    {" "}with the subject line <span className="font-semibold text-white/80">&ldquo;Application &ndash; {job.title}&rdquo;</span>.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <LinkButton href={applyHref} variant="accent" className="w-full">Apply Now</LinkButton>
                    <LinkButton href="/careers" variant="secondaryOnDark" className="w-full">View All Positions</LinkButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-border bg-surface px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
          <div className="mx-auto max-w-(--container-site)">
            <Reveal className="text-center">
              <h2 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">Other Open Positions</h2>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((p) => (
                <RevealItem key={p.id}>
                  <Link href={`/careers/${p.id}`} className="group flex h-full flex-col gap-2 rounded-card bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md">
                    <span className={`w-fit rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide ${deptColors[p.department] ?? "bg-surface text-navy"}`}>{p.department}</span>
                    <h3 className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{p.title}</h3>
                    <p className="font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">📍 {p.location}</p>
                    <span className="mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:text-white group-hover:underline">View Role &rarr;</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </main>
  );
}
