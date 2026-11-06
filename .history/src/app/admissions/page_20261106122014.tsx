import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { LinkButton } from "../components/Button";
import Reveal from "../components/Reveal";
import RevealGroup from "../components/RevealGroup";
import RevealItem from "../components/RevealItem";
import FeaturedCourses from "../components/FeaturedCourses";

export const metadata: Metadata = {
  title: "Admissions | NS-VTC",
  description: "Find out how to apply and join a training program at Newton Safety and Vocational Training Center.",
};

const steps = [
  {
    number: "01",
    title: "Choose Your Course",
    description: "Browse our available programsTVET trades, HSE training or corporate courses — and select the one that matches your goals.",
    icon: <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" />,
  },
  {
    number: "02",
    title: "Contact Us",
    description: "Reach out by phone or email to confirm the next intake date, course availability and any entry requirements.",
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />,
  },
  {
    number: "03",
    title: "Submit Your Application",
    description: "Complete the online registration form or visit us in person at our campus in Rilima Sector, Bugesera District.",
    icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8ZM14 2v6h6M12 18v-6M9 15h6" />,
  },
  {
    number: "04",
    title: "Confirm Your Place",
    description: "Once your application is reviewed, you will receive confirmation of your place and details about your start date.",
    icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />,
  },
  {
    number: "05",
    title: "Begin Training",
    description: "Arrive on your start date ready to learn. Your journey toward practical skills and professional development begins here.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />,
  },
];

const requirements = [
  { label: "Age", value: "Open to young people and adults seeking skills development." },
  { label: "Education", value: "No specific academic qualifications required for most TVET programs." },
  { label: "Language", value: "Training is conducted in Kinyarwanda and English." },
  { label: "Commitment", value: "Full attendance and participation in practical sessions is expected." },
  { label: "PPE", value: "Trainees are required to wear appropriate personal protective equipment during practical sessions." },
];

export default function AdmissionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Admissions"
        title="Join NS-VTC"
        description="Everything you need to know about applying for a training program at Newton Safety and Vocational Training Center."
      />

      <FeaturedCourses />

      {/* Application Process */}
      <section className="relative isolate px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero.png')" }}
          role="img"
          aria-label="Trainees at NS-VTC"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />

        <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-orange">How It Works</span>
            <h2 className="mt-2 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-white">
              Application Process
            </h2>
            <span className="mt-3 block h-[3px] w-12 rounded-full bg-orange" aria-hidden="true" />
            <p className="mt-4 font-body text-[15px] leading-[1.6] text-on-navy">
              Follow these five simple steps to secure your place at NS-VTC and begin your journey toward practical skills and professional development.
            </p>
            <div className="mt-6">
              <LinkButton href="/register" variant="secondaryOnDark">Apply Now</LinkButton>
            </div>
          </Reveal>
          </div>

          <RevealGroup className="divide-y divide-white/15">
            {steps.map((step, i) => (
              <RevealItem key={step.number} className="flex items-start gap-4 py-4 first:pt-0">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 text-white shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {step.icon}
                  </svg>
                </span>
                <div className="pt-1">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-orange">Step {step.number}</p>
                  <h3 className="mt-0.5 font-heading text-[15px] font-bold text-white">{step.title}</h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-on-navy">{step.description}</p>
                </div>
                <span className="ml-auto hidden flex-none pt-1 font-heading text-2xl font-extrabold text-white/10 sm:block" aria-hidden="true">
                  {step.number}
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
