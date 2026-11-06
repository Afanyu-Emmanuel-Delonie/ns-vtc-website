import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { LinkButton } from "../components/Button";
import Reveal from "../components/Reveal";
import RevealGroup from "../components/RevealGroup";
import RevealItem from "../components/RevealItem";

export const metadata: Metadata = {
  title: "Admissions | NS-VTC",
  description: "Find out how to apply and join a training program at Newton Safety and Vocational Training Center.",
};

const steps = [
  {
    number: "01",
    title: "Choose Your Course",
    description: "Browse our available programs TVET trades, HSE training or corporate courses and select the one that matches your goals.",
  },
  {
    number: "02",
    title: "Contact Us",
    description: "Reach out by phone or email to confirm the next intake date, course availability and any entry requirements.",
  },
  {
    number: "03",
    title: "Submit Your Application",
    description: "Complete the online registration form or visit us in person at our campus in Rilima Sector, Bugesera District.",
  },
  {
    number: "04",
    title: "Confirm Your Place",
    description: "Once your application is reviewed, you will receive confirmation of your place and details about your start date.",
  },
  {
    number: "05",
    title: "Begin Training",
    description: "Arrive on your start date ready to learn. Your journey toward practical skills and professional development begins here.",
  },
];

const requirements = [
  { label: "Age", value: "Open to young people and adults seeking skills development." },
  { label: "Education", value: "No specific academic qualifications required for most TVET programs." },
  { label: "Language", value: "Training is conducted in Kinyarwanda and English." },
  { label: "Commitment", value: "Full attendance and participation in practical sessions is expected." },
  { label: "PPE", value: "Trainees are required to wear appropriate personal protective equipment during practical sessions." },
];

const courses = [
  { name: "Scaffolding", duration: "To be confirmed" },
  { name: "Steel Fixing", duration: "To be confirmed" },
  { name: "Tailoring", duration: "6 Months" },
  { name: "Welding", duration: "6 Months" },
  { name: "Carpentry", duration: "To be confirmed" },
  { name: "Painting", duration: "To be confirmed" },
  { name: "HSE Training", duration: "3 Months" },
  { name: "Masonry", duration: "3 Months" },
];

export default function AdmissionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Admissions"
        title="Join NS-VTC"
        description="Everything you need to know about applying for a training program at Newton Safety and Vocational Training Center."
      />

      {/* Application Process — steps + image side by side */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="flex flex-col items-center text-center">
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Application Process</h2>
          </Reveal>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* steps */}
            <div className="flex flex-col gap-0">
              {steps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.08} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-md">
                      {step.number}
                    </div>
                    {i < steps.length - 1 && <div className="w-[2px] flex-1 bg-orange/30" />}
                  </div>
                  <div className={i < steps.length - 1 ? "pb-8" : ""}>
                    <h3 className="font-heading text-base font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* image */}
            <Reveal delay={0.2} className="hidden lg:block">
              <div
                className="h-[520px] w-full rounded-3xl bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/hero.png')" }}
                role="img"
                aria-label="NS-VTC training campus"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Courses at a glance */}
      <section className="bg-surface px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-orange">Available Programs</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Courses at a Glance</h2>
            <span className="mt-3 block h-[3px] w-12 rounded-full bg-navy" aria-hidden="true" />
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <RevealItem key={course.name} className="flex items-center justify-between rounded-card bg-white p-4 shadow-sm">
                <span className="font-heading text-sm font-bold text-ink">{course.name}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${course.duration === "To be confirmed" ? "border border-dashed border-border text-muted" : "bg-navy/10 text-navy"}`}>
                  {course.duration}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Entry requirements + accommodation */}
      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-orange">What You Need</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Entry Requirements</h2>
            <span className="mt-3 block h-[3px] w-12 rounded-full bg-navy" aria-hidden="true" />
            <ul className="mt-8 flex flex-col gap-4">
              {requirements.map((req) => (
                <li key={req.label} className="flex gap-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/10">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-heading text-sm font-bold text-ink">{req.label}: </span>
                    <span className="text-sm text-muted">{req.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-3xl bg-navy p-8">
              <svg viewBox="0 0 256 256" aria-hidden="true" className="mb-4 w-10 fill-white opacity-20">
                <path d="M 180 0 C 221.974 0 256 34.026 256 76 L 256 256 L 180 256 C 138.026 256 104 221.974 104 180 C 104 138.026 138.026 104 180 104 L 208 104 L 208 76 C 208 60.536 195.464 48 180 48 L 76 48 C 60.536 48 48 60.536 48 76 L 48 180 C 48 195.464 60.536 208 76 208 L 96 208 L 96 256 L 76 256 C 34.026 256 0 221.974 0 180 L 0 76 C 0 34.026 34.026 0 76 0 Z" />
              </svg>
              <p className="text-xs font-bold uppercase tracking-widest text-orange">Accommodation</p>
              <h3 className="mt-2 font-heading text-xl font-extrabold text-white">Stay On Campus</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Accommodation arrangements are available for both male and female trainees. Contact us to confirm availability, arrangements and any associated costs before your intake date.
              </p>
            </div>

            <div className="rounded-3xl bg-surface p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-orange">Location</p>
              <h3 className="mt-2 font-heading text-xl font-extrabold text-ink">Find Us</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">Rilima Sector, Bugesera District, Eastern Province, Rwanda.</p>
              <div className="mt-4 flex flex-col gap-1 text-sm text-muted">
                <a href="tel:+250788986489" className="transition-colors hover:text-navy">+250 788 986 489</a>
                <a href="tel:+250799528247" className="transition-colors hover:text-navy">+250 799 528 247</a>
                <a href="mailto:newtonvtc@gmail.com" className="transition-colors hover:text-navy">newtonvtc@gmail.com</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <Reveal className="mx-auto flex max-w-(--container-site) flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange">Take the First Step</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Ready to Apply?</h2>
          <span className="block h-[3px] w-12 rounded-full bg-navy" aria-hidden="true" />
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">Fill in the registration form and our team will get back to you with your intake details.</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/register" variant="accent">Register Now</LinkButton>
            <LinkButton href="/#contact" variant="secondary">Contact Us First</LinkButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
