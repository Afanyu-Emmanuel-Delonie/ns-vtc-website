"use client";

import { useEffect, useRef, useState } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { exportCsv } from "../../../lib/exportCsv";

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

const LINE_HEIGHT = 20; // px — matches text-sm with default line-height
const MAX_LINES = 6;

function AutoTextarea({ value, onChange, placeholder, required, className }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, LINE_HEIGHT * MAX_LINES + 16) + "px";
  }, [value]);

  return (
    <textarea
      ref={ref}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={1}
      style={{ resize: "none", overflowY: "hidden" }}
      className={className}
    />
  );
}

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
        <AutoTextarea required value={form.description} onChange={(v) => set("description", v)} placeholder="One or two sentences summarising the role." className={taClass} />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Full Body * (shown on detail page)</label>
        <AutoTextarea required value={form.body} onChange={(v) => set("body", v)} placeholder="Full role description..." className={taClass} />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Responsibilities (one per line)</label>
        <AutoTextarea value={respText} onChange={setRespText} placeholder={"Plan and deliver lessons\nAssess student progress\n..."} className={taClass} />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Requirements (one per line)</label>
        <AutoTextarea value={reqText} onChange={setReqText} placeholder={"3+ years experience\nTrade certificate\n..."} className={taClass} />
      </div>
      <div>
        <label className="mb-1 block font-body text-xs font-semibold text-muted">Qualifications (one per line)</label>
        <AutoTextarea value={qualText} onChange={setQualText} placeholder={"Certificate in relevant trade\nFluency in Kinyarwanda\n..."} className={taClass} />
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
  const [mode, setMode] = useState<"list" | "add" | "edit" | "view">("list");
  const [editing, setEditing] = useState<Job | null>(null);
  const [viewing, setViewing] = useState<Job | null>(null);
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

  if (mode === "view" && viewing) {
    const j = viewing;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button onClick={() => { setMode("list"); setViewing(null); }} className="inline-flex items-center gap-1.5 font-body text-sm text-muted hover:text-ink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back
          </button>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide ${deptColors[j.department] ?? "bg-surface text-muted"}`}>{j.department}</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 font-body text-[11px] font-medium text-muted">{j.type}</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 font-body text-[11px] font-medium text-muted">📍 {j.location}</span>
              {j.archived && <span className="rounded-full bg-surface px-2.5 py-0.5 font-body text-[11px] font-semibold text-muted">Archived</span>}
            </div>
            <h1 className="mt-3 font-heading text-2xl font-extrabold text-ink">{j.title}</h1>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted">{j.description}</p>
          </div>
          <button onClick={() => { setEditing(j); setMode("edit"); }} className="flex-none rounded-control border border-border px-4 py-2 font-body text-sm font-semibold text-ink hover:bg-surface">Edit</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-border bg-white p-6">
            <h2 className="font-heading text-base font-bold text-ink">The Position</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted">{j.body}</p>
          </div>
          <div className="flex flex-col gap-6">
            {j.responsibilities?.length > 0 && (
              <div className="rounded-card border border-border bg-white p-6">
                <h2 className="font-heading text-base font-bold text-ink">Responsibilities</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {j.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" /><span className="font-body text-sm text-muted">{r}</span></li>
                  ))}
                </ul>
              </div>
            )}
            {j.requirements?.length > 0 && (
              <div className="rounded-card border border-border bg-white p-6">
                <h2 className="font-heading text-base font-bold text-ink">Requirements</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {j.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" /><span className="font-body text-sm text-muted">{r}</span></li>
                  ))}
                </ul>
              </div>
            )}
            {j.qualifications?.length > 0 && (
              <div className="rounded-card border border-border bg-white p-6">
                <h2 className="font-heading text-base font-bold text-ink">Qualifications</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {j.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" /><span className="font-body text-sm text-muted">{q}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
        <div className="flex items-center gap-2">
          <button onClick={() => setMode("add")} className="rounded-control bg-navy px-4 py-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-80">
            + Add Job
          </button>
          <button
            onClick={() => exportCsv("jobs.csv", jobs.map(({ id, responsibilities, requirements, qualifications, ...j }) => ({ ...j, responsibilities: responsibilities.join("; "), requirements: requirements.join("; "), qualifications: qualifications.join("; ") })))}
            className="inline-flex items-center gap-2 rounded-control border border-border px-4 py-2 font-body text-sm font-semibold text-ink hover:bg-surface"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            Export CSV
          </button>
        </div>
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
                      <button onClick={() => { setViewing(j); setMode("view"); }} className="font-body text-xs font-semibold text-navy hover:underline">View</button>
                      <button onClick={() => { setEditing(j); setMode("edit"); }} className="font-body text-xs font-semibold text-muted hover:underline">Edit</button>
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
