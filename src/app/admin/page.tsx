"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Application = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  course: string;
  createdAt: { seconds: number } | null;
};

export default function AdminPage() {
  const [total, setTotal] = useState<number | null>(null);
  const [recent, setRecent] = useState<Application[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "applications"));
      setTotal(snap.size);

      const q = query(collection(db, "applications"), orderBy("createdAt", "desc"), limit(5));
      const recentSnap = await getDocs(q);
      setRecent(recentSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Application)));
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-ink">Overview</h1>
        <p className="mt-1 font-body text-sm text-muted">Welcome back. Here&rsquo;s a summary of NS-VTC activity.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-white p-6">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted">Total Applications</p>
          <p className="mt-2 font-heading text-4xl font-extrabold text-ink">
            {total === null ? "—" : total}
          </p>
        </div>
        <div className="rounded-card border border-border bg-white p-6">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted">Courses Offered</p>
          <p className="mt-2 font-heading text-4xl font-extrabold text-ink">8</p>
        </div>
        <div className="rounded-card border border-border bg-white p-6">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted">Open Positions</p>
          <p className="mt-2 font-heading text-4xl font-extrabold text-ink">5</p>
        </div>
      </div>

      {/* Recent applications */}
      <div className="rounded-card border border-border bg-white">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-heading text-base font-bold text-ink">Recent Applications</h2>
        </div>
        {recent.length === 0 ? (
          <p className="px-6 py-8 font-body text-sm text-muted">No applications yet.</p>
        ) : (
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-3 font-semibold text-muted">Name</th>
                <th className="px-6 py-3 font-semibold text-muted">Phone</th>
                <th className="px-6 py-3 font-semibold text-muted">Course</th>
                <th className="px-6 py-3 font-semibold text-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-medium text-ink">{a.firstName} {a.lastName}</td>
                  <td className="px-6 py-3 text-muted">{a.phone}</td>
                  <td className="px-6 py-3 text-muted">{a.course}</td>
                  <td className="px-6 py-3 text-muted">
                    {a.createdAt ? new Date(a.createdAt.seconds * 1000).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
