"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, writeBatch, orderBy, query, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { exportCsv } from "../../../lib/exportCsv";

type Contact = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
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

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [confirm, setConfirm] = useState<{ message: string; onConfirm: () => void } | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(query(collection(db, "contacts"), orderBy("createdAt", "desc")));
      setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact)));
      setLoading(false);
    }
    load();
  }, []);

  const filtered = contacts.filter((c) => {
    const s = search.toLowerCase();
    return c.fullName?.toLowerCase().includes(s) || c.email?.toLowerCase().includes(s) || c.phone?.includes(s);
  });

  function ask(message: string, onConfirm: () => void) {
    setConfirm({ message, onConfirm });
  }

  function handleDelete(id: string) {
    ask("Delete this message? This cannot be undone.", async () => {
      setConfirm(null);
      setDeleting(id);
      await deleteDoc(doc(db, "contacts", id));
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setDeleting(null);
    });
  }

  function handleClearAll() {
    ask(`Delete all ${filtered.length} visible message(s)? This cannot be undone.`, async () => {
      setConfirm(null);
      setClearing(true);
      const batch = writeBatch(db);
      filtered.forEach((c) => batch.delete(doc(db, "contacts", c.id)));
      await batch.commit();
      setContacts((prev) => prev.filter((c) => !filtered.find((f) => f.id === c.id)));
      setClearing(false);
    });
  }

  return (
    <>
      {confirm && <ConfirmDialog message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-ink">Contact Messages</h1>
            <p className="mt-1 font-body text-sm text-muted">Messages submitted through the homepage contact form.</p>
          </div>
          <button
            onClick={() => exportCsv("contacts.csv", contacts.map(({ id, createdAt, ...c }) => ({ ...c, date: createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : "" })))}
            className="inline-flex items-center gap-2 rounded-control border border-border px-4 py-2 font-body text-sm font-semibold text-ink hover:bg-surface"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            Export CSV
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-9 w-full max-w-xs rounded-control border border-border bg-white px-3 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          />
          <span className="self-center font-body text-sm text-muted">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          {filtered.length > 0 && (
            <button onClick={handleClearAll} disabled={clearing} className="ml-auto rounded-control border border-red-200 px-3 py-1.5 font-body text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50">
              {clearing ? "Clearing..." : `Clear ${filtered.length === contacts.length ? "All" : "Filtered"} (${filtered.length})`}
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-card border border-border bg-white">
          {loading ? (
            <p className="px-6 py-8 font-body text-sm text-muted">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="px-6 py-8 font-body text-sm text-muted">No messages found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface text-left">
                    <th className="px-5 py-3 font-semibold text-muted">Sender</th>
                    <th className="px-5 py-3 font-semibold text-muted">Phone</th>
                    <th className="px-5 py-3 font-semibold text-muted">Course</th>
                    <th className="px-5 py-3 font-semibold text-muted">Message</th>
                    <th className="px-5 py-3 font-semibold text-muted">Date</th>
                    <th className="px-5 py-3 font-semibold text-muted"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-surface/60">
                      <td className="px-5 py-3">
                        <p className="font-medium text-ink">{c.fullName}</p>
                        <p className="text-xs text-muted">{c.email || "—"}</p>
                      </td>
                      <td className="px-5 py-3 text-muted">{c.phone || "—"}</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs font-semibold text-navy">{c.course || "—"}</span>
                      </td>
                      <td className="max-w-xs px-5 py-3 text-muted">
                        <p className="truncate">{c.message || "—"}</p>
                      </td>
                      <td className="px-5 py-3 text-muted">{c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleDateString() : "—"}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => handleDelete(c.id)} disabled={deleting === c.id} className="font-body text-xs font-semibold text-red-500 hover:underline disabled:opacity-50">
                          {deleting === c.id ? "..." : "Delete"}
                        </button>
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
