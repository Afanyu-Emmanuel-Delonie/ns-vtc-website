"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

type Application = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  district: string;
  province: string;
  course: string;
  accommodation: string;
  message: string;
  createdAt: { seconds: number } | null;
};

function ApplicationDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    getDoc(doc(db, "applications", id)).then((snap) => {
      if (snap.exists()) setApp(snap.data() as Application);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="font-body text-sm text-muted">Loading...</p>;
  if (!app) return <p className="font-body text-sm text-muted">Application not found.</p>;

  const fields = [
    ["Phone", app.phone],
    ["Email", app.email],
    ["Course", app.course],
    ["Accommodation", app.accommodation],
    ["District", app.district],
    ["Province", app.province],
  ];

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => router.back()}
        className="inline-flex w-fit items-center gap-1.5 font-body text-sm text-muted hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>

      <div>
        <h1 className="font-heading text-2xl font-extrabold text-ink">{app.firstName} {app.lastName}</h1>
        <p className="mt-1 font-body text-sm text-muted">
          {app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—"}
        </p>
      </div>

      <div className="rounded-card border border-border bg-white p-6">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 font-body text-sm sm:grid-cols-3">
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</dt>
              <dd className="mt-1 text-ink">{value || "—"}</dd>
            </div>
          ))}
        </dl>
        {app.message && (
          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-muted">Message</p>
            <p className="font-body text-sm leading-relaxed text-ink">{app.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  return (
    <Suspense fallback={<p className="font-body text-sm text-muted">Loading...</p>}>
      <ApplicationDetail />
    </Suspense>
  );
}
