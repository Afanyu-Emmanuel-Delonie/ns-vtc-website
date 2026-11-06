import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import { LinkButton } from "../../components/Button";
import Reveal from "../../components/Reveal";
import RevealGroup from "../../components/RevealGroup";
import RevealItem from "../../components/RevealItem";
import FeaturedCourses from "../../components/FeaturedCourses";

export const metadata: Metadata = {
  title: "Admissions | NS-VTC",
  description: "Find out how to apply and join a training program at Newton Safety and Vocational Training Center.",
};

const steps = [
  {
    number: "01",
    title: "Choose Your Course",
    description: "Browse our available programs TVET trades, HSE training or corporate courses and select the one that matches your goals.",
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
  {
    label: "Age",
    value: "Open to young people and adults seeking skills development.",
    icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  },
  {
    label: "Education",
    value: "No specific academic qualifications required for most TVET programs.",
    icon: <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5ZM6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />,
  },
  {
    label: "Language",
    value: "Training is conducted in Kinyarwanda and English.",
    icon: <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />,
  },
  {
    label: "Commitment",
    value: "Full attendance and participation in practical sessions is expected.",
    icon: <path d="M12 22V12M12 12 7 7M12 12l5-5M2 12h4M18 12h4M12 2v4" />,
  },
  {
    label: "PPE",
    value: "Trainees must wear appropriate personal protective equipment during practical sessions.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />,
  },
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
      <section className="bg-white px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">

          <Reveal className="mx-auto max-w-2xl text-center">
          
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Entry Requirements</h2>
           
            <p className="mt-4 text-sm leading-relaxed text-muted">NS-VTC is open to anyone ready to learn. Here is what to expect before you join.</p>
          </Reveal>

          <RevealGroup className="mt-10 flex flex-wrap justify-center gap-3">
            {requirements.map((req) => (
              <RevealItem key={req.label} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]">
                <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-card bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md">
                  <div className="pointer-events-none absolute -right-2 -top-2 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {Array.from({ length: 25 }, (_, i) => {
                      const r = Math.floor(i / 5), c = i % 5;
                      return <span key={i} className="h-2.5 w-2.5 rounded-xs bg-white" style={{ opacity: Math.max(0, 1 - (r + (4 - c)) * 0.16) }} />;
                    })}
                  </div>
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {req.icon}
                    </svg>
                  </span>
                  <div className="relative">
                    <p className="font-heading text-sm font-bold text-ink transition-colors group-hover:text-white">{req.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">{req.value}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-navy p-8">
                <svg viewBox="0 0 256 256" aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-6 w-40 fill-white opacity-[0.06]">
                  <path d="M 180 0 C 221.974 0 256 34.026 256 76 L 256 256 L 180 256 C 138.026 256 104 221.974 104 180 C 104 138.026 138.026 104 180 104 L 208 104 L 208 76 C 208 60.536 195.464 48 180 48 L 76 48 C 60.536 48 48 60.536 48 76 L 48 180 C 48 195.464 60.536 208 76 208 L 96 208 L 96 256 L 76 256 C 34.026 256 0 221.974 0 180 L 0 76 C 0 34.026 34.026 0 76 0 Z" />
                </svg>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange">Accommodation</p>
                  <h3 className="mt-1 font-heading text-xl font-extrabold text-white">Stay On Campus</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">Accommodation is available for both male and female trainees. Contact us to confirm availability and any associated costs before your intake date.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-white p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10 text-navy">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange">Location</p>
                  <h3 className="mt-1 font-heading text-xl font-extrabold text-ink">Find Us</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">Rilima Sector, Bugesera District, Eastern Province, Rwanda.</p>
                  <div className="mt-4 flex flex-col gap-1 text-sm">
                    <a href="tel:+250788986489" className="text-muted transition-colors hover:text-navy">+250 788 986 489</a>
                    <a href="tel:+250799528247" className="text-muted transition-colors hover:text-navy">+250 799 528 247</a>
                    <a href="mailto:newtonvtc@gmail.com" className="text-muted transition-colors hover:text-navy">newtonvtc@gmail.com</a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* CTA */}
    </main>
  );
}
