import type { Metadata } from "next";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import JobDetailClient from "./JobDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const snap = await getDocs(collection(db, "jobs"));
  const slugs = snap.docs.map((d) => d.id);
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "_" }];
}

async function getJob(slug: string) {
  const snap = await getDoc(doc(db, "jobs", slug));
  return snap.exists() ? { id: snap.id, ...snap.data() } as Record<string, unknown> : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return {};
  const title = `${job.title as string} — Careers`;
  const description = (job.description as string) ?? `${job.title} position at NS-VTC, ${job.location ?? "Bugesera, Rwanda"}.`;
  return {
    title,
    description,
    alternates: { canonical: `/careers/${slug}` },
    openGraph: { url: `/careers/${slug}` },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJob(slug);

  const jsonLd = job
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.body ?? job.description,
        datePosted: new Date().toISOString(),
        employmentType: (job.type as string)?.toUpperCase().replace(/[\s-]+/g, "_"),
        hiringOrganization: {
          "@type": "Organization",
          name: "NS-VTC",
          sameAs: "https://newtonsafetyvtc.com",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bugesera District",
            addressRegion: "Eastern Province",
            addressCountry: "RW",
          },
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <JobDetailClient />
    </>
  );
}
