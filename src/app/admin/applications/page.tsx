"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, writeBatch, orderBy, query, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Link from "next/link";

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

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  async function handleDelete(id: string) {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "applications", id));
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
  }

  async function handleClearAll() {
    if (!confirm(`Delete all ${filtered.length} visible application(s)? This cannot be undone.`)) return;
    setClearing(true);
    const batch = writeBatch(db);
    filtered.forEach((a) => batch.delete(doc(db, "applications", a.id)));
    await batch.commit();
    const remaining = applications.filter((a) => !filtered.find((f) => f.id === a.id));
    setApplications(remaining);
    setClearing(false);
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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-ink">Applications</h1>
          <p className="mt-1 font-body text-sm text-muted">All course applications submitted through the website.</p>
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
