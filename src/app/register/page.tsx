"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseSelect from "../components/CourseSelect";
import { Button } from "../components/Button";

const courses = [
  "Select a course",
  "Scaffolding",
  "Steel Fixing",
  "Tailoring (6 Months)",
  "Welding (6 Months)",
  "Carpentry",
  "Painting",
  "HSE Training (3 Months)",
  "Masonry (3 Months)",
  "Corporate Training",
  "Not sure yet",
];

const inputClass =
  "min-h-11 w-full rounded-control border border-border bg-white px-3 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("course") ?? "Select a course";
  const defaultCourse = courses.includes(preselected) ? preselected : "Select a course";

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-surface px-[clamp(16px,5vw,64px)] py-10">
      <div className="mx-auto max-w-3xl">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-opacity hover:opacity-70"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white py-20 text-center shadow-sm">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-ink">Application Received!</h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Thank you for applying to NS-VTC. Our admissions team will review your application and contact you within 2–3 business days with your intake details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8 border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange">NS-VTC</span>
              <h1 className="mt-1 font-heading text-2xl font-extrabold text-ink">Apply for Training</h1>
              <p className="mt-1 text-sm text-muted">Complete the form and our admissions team will contact you with your intake details.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink">First Name *</label>
                  <input id="firstName" name="firstName" type="text" placeholder="Jean" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-ink">Last Name *</label>
                  <input id="lastName" name="lastName" type="text" placeholder="Uwimana" required className={inputClass} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" placeholder="+250 7xx xxx xxx" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" className={inputClass} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="district" className="mb-1.5 block text-sm font-medium text-ink">District *</label>
                  <input id="district" name="district" type="text" placeholder="e.g. Bugesera" required className={inputClass} />
                </div>
                <CourseSelect
                  label="Province *"
                  name="province"
                  options={["Select a province", "Kigali City", "Eastern Province", "Western Province", "Northern Province", "Southern Province"]}
                />
              </div>

              <CourseSelect label="Course of Interest *" name="course" options={courses} defaultValue={defaultCourse} />

              <div>
                <p className="mb-2 text-sm font-medium text-ink">Do you need accommodation? *</p>
                <div className="flex gap-6">
                  {["Yes", "No", "Not sure yet"].map((opt) => (
                    <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                      <input type="radio" name="accommodation" value={opt} required className="accent-navy" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Additional Information</label>
                <textarea id="message" name="message" rows={4} placeholder="Any questions, previous experience or anything else you'd like us to know..." className="w-full rounded-control border border-border bg-white px-3 py-2.5 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2" />
              </div>

              <p className="rounded-card bg-surface px-4 py-3 text-xs leading-relaxed text-muted">
                By submitting this form you agree to be contacted by NS-VTC regarding your application. Your information will not be shared with third parties.
              </p>

              <Button type="submit" variant="accent" className="self-start">
                Submit Application
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
