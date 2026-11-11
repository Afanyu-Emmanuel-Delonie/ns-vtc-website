"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, writeBatch, orderBy, query, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Link from "next/link";
import { exportCsv } from "../../../lib/exportCsv";

type Application = {
  id: string;
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

function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-card border border-border bg-white p-6 shadow-xl">
        <p className="font-body text-sm text-ink">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-control border border-border px-4 py-2 font-body text-sm font-medium text-ink hover:bg-surface">Cancel</button>
          <button onClick={onConfirm} className="rounded-control bg-red-600 px-4 py-2 font-body text-sm font-semibold text-white hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [confirm, setConfirm] = useState<{ message: string; onConfirm: () => void } | null>(null);

  function ask(message: string, onConfirm: () => void) {
    setConfirm({ message, onConfirm });
  }

  async function handleDelete(id: string) {
    ask("Delete this application? This cannot be undone.", async () => {
      setConfirm(null);
      setDeleting(id);
      await deleteDoc(doc(db, "applications", id));
      setApplications((prev) => prev.filter((a) => a.id !== id));
      setDeleting(null);
    });
  }

  async function handleClearAll() {
    ask(`Delete all ${filtered.length} visible application(s)? This cannot be undone.`, async () => {
      setConfirm(null);
      setClearing(true);
      const batch = writeBatch(db);
      filtered.forEach((a) => batch.delete(doc(db, "applications", a.id)));
      await batch.commit();
      setApplications((prev) => prev.filter((a) => !filtered.find((f) => f.id === a.id)));
      setClearing(false);
    });
  }

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setApplications(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Application)));
      setLoading(false);
    }
    load();
  }, []);

  const courses = ["All", ...Array.from(new Set(applications.map((a) => a.course).filter(Boolean)))];

  const filtered = applications.filter((a) => {
    const name = `${a.firstName} ${a.lastName}`.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || a.phone?.includes(search) || a.email?.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === "All" || a.course === courseFilter;
    return matchSearch && matchCourse;
  });

  return (
    <>
      {confirm && <ConfirmDialog message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-ink">Applications</h1>
            <p className="mt-1 font-body text-sm text-muted">All course applications submitted through the website.</p>
          </div>
          <button
            onClick={() => exportCsv("applications.csv", applications.map(({ id, createdAt, ...a }) => ({ ...a, date: createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : "" })))}
            className="inline-flex items-center gap-2 rounded-control border border-border px-4 py-2 font-body text-sm font-semibold text-ink hover:bg-surface"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            Export CSV
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-9 w-full max-w-xs rounded-control border border-border bg-white px-3 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          />
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="min-h-9 rounded-control border border-border bg-white px-3 font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            {courses.map((c) => <option key={c}>{c}</option>)}
          </select>
          <span className="self-center font-body text-sm text-muted">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          {filtered.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={clearing}
              className="ml-auto rounded-control border border-red-200 px-3 py-1.5 font-body text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {clearing ? "Clearing..." : `Clear ${filtered.length === applications.length ? "All" : "Filtered"} (${filtered.length})`}
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-card border border-border bg-white">
          {loading ? (
            <p className="px-6 py-8 font-body text-sm text-muted">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="px-6 py-8 font-body text-sm text-muted">No applications found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface text-left">
                    <th className="px-5 py-3 font-semibold text-muted">Applicant</th>
                    <th className="px-5 py-3 font-semibold text-muted">Phone</th>
                    <th className="px-5 py-3 font-semibold text-muted">Course</th>
                    <th className="px-5 py-3 font-semibold text-muted">District</th>
                    <th className="px-5 py-3 font-semibold text-muted">Date</th>
                    <th className="px-5 py-3 font-semibold text-muted"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id} className="border-b border-border last:border-0 hover:bg-surface/60">
                      <td className="px-5 py-3">
                        <p className="font-medium text-ink">{a.firstName} {a.lastName}</p>
                        <p className="text-xs text-muted">{a.email || "—"}</p>
                      </td>
                      <td className="px-5 py-3 text-muted">{a.phone || "—"}</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs font-semibold text-navy">{a.course || "—"}</span>
                      </td>
                      <td className="px-5 py-3 text-muted">{a.district || "—"}</td>
                      <td className="px-5 py-3 text-muted">{a.createdAt ? new Date(a.createdAt.seconds * 1000).toLocaleDateString() : "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Link href={`/admin/applications/detail?id=${a.id}`} className="font-body text-xs font-semibold text-navy hover:underline">View</Link>
                          <button
                            onClick={() => handleDelete(a.id)}
                            disabled={deleting === a.id}
                            className="font-body text-xs font-semibold text-red-500 hover:underline disabled:opacity-50"
                          >
                            {deleting === a.id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
