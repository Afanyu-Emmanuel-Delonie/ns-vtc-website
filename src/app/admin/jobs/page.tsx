"use client";

import { useEffect, useState } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

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

const empty: Omit<Job, "id"> = {
  title: "", department: "TVET", type: "Full-time", location: "Bugesera, Rwanda",
  description: "", body: "", responsibilities: [], requirements: [], qualifications: [],
  archived: false,
};

const departments = ["TVET", "HSE", "Corporate", "Administration"];
const types = ["Full-time", "Part-time", "Contract"];

function JobForm({ initial, onSave, onCancel, saving }: {
  initial: Omit<Job, "id">;
  onSave: (data: Omit<Job, "id">) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [respText, setRespText] = useState(initial.responsibilities.join("\n"));
  const [reqText, setReqText] = useState(initial.requirements.join("\n"));
  const [qualText, setQualText] = useState(initial.qualifications.join("\n"));

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      responsibilities: respText.split("\n").map((s) => s.trim()).filter(Boolean),
      requirements: reqText.split("\n").map((s) => s.trim()).filter(Boolean),
      qualifications: qualText.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  }

  const inputClass = "min-h-9 w-full rounded-control border border-border bg-white px-3 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy";
  const taClass = "w-full rounded-control border border-border bg-white px-3 py-2 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="mb-1 block font-body text-xs font-semibold text-muted">Job Title *</label>
          <input required className={inputClass} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Welding Instructor" />
        </div>
        <div>
          <label className="mb-1 block font-body text-xs font-semibold text-muted">Department *</label>
          <select required className={inputClass} value={form.department} onChange={(e) => set("department", e.target.value)}>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-body text-xs font-semibold text-muted">Type *</label>
          <select required className={inputClass} value={form.type} onChange={(e) => set("type", e.target.value)}>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="mb-1 block font-body text-xs font-semibold text-muted">Location *</label>
          <input required className={inputClass} value={form.location} onChange={(e) => set("location", e.target.value)} />
        </div>
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Short Description * (shown on cards)</label>
        <textarea required rows={2} className={taClass} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="One or two sentences summarising the role." />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Full Body * (shown on detail page)</label>
        <textarea required rows={4} className={taClass} value={form.body} onChange={(e) => set("body", e.target.value)} placeholder="Full role description..." />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Responsibilities (one per line)</label>
        <textarea rows={4} className={taClass} value={respText} onChange={(e) => setRespText(e.target.value)} placeholder={"Plan and deliver lessons\nAssess student progress\n..."} />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Requirements (one per line)</label>
        <textarea rows={3} className={taClass} value={reqText} onChange={(e) => setReqText(e.target.value)} placeholder={"3+ years experience\nTrade certificate\n..."} />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Qualifications (one per line)</label>
        <textarea rows={3} className={taClass} value={qualText} onChange={(e) => setQualText(e.target.value)} placeholder={"Certificate in relevant trade\nFluency in Kinyarwanda\n..."} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="rounded-control bg-navy px-4 py-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50">
          {saving ? "Saving..." : "Save Job"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-control border border-border px-4 py-2 font-body text-sm font-semibold text-ink hover:bg-surface">
          Cancel
        </button>
      </div>
    </form>
  );
}

const deptColors: Record<string, string> = {
  TVET: "bg-navy/10 text-navy",
  HSE: "bg-orange/10 text-orange",
  Corporate: "bg-emerald-100 text-emerald-700",
  Administration: "bg-purple-100 text-purple-700",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<Job | null>(null);
  const [saving, setSaving] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  async function load() {
    const snap = await getDocs(query(collection(db, "jobs"), orderBy("title")));
    setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Job)));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSave(data: Omit<Job, "id">) {
    setSaving(true);
    if (editing) {
      await updateDoc(doc(db, "jobs", editing.id), { ...data, updatedAt: serverTimestamp() });
    } else {
      await addDoc(collection(db, "jobs"), { ...data, archived: false, createdAt: serverTimestamp() });
    }
    setSaving(false);
    setMode("list");
    setEditing(null);
    load();
  }

  async function toggleArchive(job: Job) {
    await updateDoc(doc(db, "jobs", job.id), { archived: !job.archived });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Permanently delete this job? This cannot be undone.")) return;
    await deleteDoc(doc(db, "jobs", id));
    load();
  }

  const visible = jobs.filter((j) => showArchived ? j.archived : !j.archived);

  if (mode === "add" || mode === "edit") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-ink">{mode === "add" ? "Add Job" : "Edit Job"}</h1>
          <p className="mt-1 font-body text-sm text-muted">Fill in the details below.</p>
        </div>
        <div className="rounded-card border border-border bg-white p-6">
          <JobForm
            initial={editing ? { title: editing.title, department: editing.department, type: editing.type, location: editing.location, description: editing.description, body: editing.body, responsibilities: editing.responsibilities, requirements: editing.requirements, qualifications: editing.qualifications, archived: editing.archived } : empty}
            onSave={handleSave}
            onCancel={() => { setMode("list"); setEditing(null); }}
            saving={saving}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-ink">Jobs</h1>
          <p className="mt-1 font-body text-sm text-muted">Manage open positions shown on the careers page.</p>
        </div>
        <button onClick={() => setMode("add")} className="rounded-control bg-navy px-4 py-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-80">
          + Add Job
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setShowArchived(false)} className={`rounded-control px-3 py-1.5 font-body text-sm font-semibold transition-colors ${!showArchived ? "bg-navy text-white" : "border border-border text-ink hover:bg-surface"}`}>
          Active ({jobs.filter((j) => !j.archived).length})
        </button>
        <button onClick={() => setShowArchived(true)} className={`rounded-control px-3 py-1.5 font-body text-sm font-semibold transition-colors ${showArchived ? "bg-navy text-white" : "border border-border text-ink hover:bg-surface"}`}>
          Archived ({jobs.filter((j) => j.archived).length})
        </button>
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-white">
        {loading ? (
          <p className="px-6 py-8 font-body text-sm text-muted">Loading...</p>
        ) : visible.length === 0 ? (
          <p className="px-6 py-8 font-body text-sm text-muted">{showArchived ? "No archived jobs." : "No active jobs. Add one above."}</p>
        ) : (
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="px-5 py-3 font-semibold text-muted">Title</th>
                <th className="px-5 py-3 font-semibold text-muted">Department</th>
                <th className="px-5 py-3 font-semibold text-muted">Type</th>
                <th className="px-5 py-3 font-semibold text-muted">Location</th>
                <th className="px-5 py-3 font-semibold text-muted"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((j) => (
                <tr key={j.id} className="border-b border-border last:border-0 hover:bg-surface/60">
                  <td className="px-5 py-3 font-medium text-ink">{j.title}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${deptColors[j.department] ?? "bg-surface text-muted"}`}>{j.department}</span>
                  </td>
                  <td className="px-5 py-3 text-muted">{j.type}</td>
                  <td className="px-5 py-3 text-muted">{j.location}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => { setEditing(j); setMode("edit"); }} className="font-body text-xs font-semibold text-navy hover:underline">Edit</button>
                      <button onClick={() => toggleArchive(j)} className="font-body text-xs font-semibold text-muted hover:underline">
                        {j.archived ? "Restore" : "Archive"}
                      </button>
                      <button onClick={() => handleDelete(j.id)} className="font-body text-xs font-semibold text-red-600 hover:underline">Delete</button>
                    </div>
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
