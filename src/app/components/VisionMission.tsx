import Reveal from "./Reveal";

const items = [
  {
    label: "Our Vision",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      </svg>
    ),
    text: "To become a leading vocational and safety training center recognized for developing skilled, competent and job-ready professionals who contribute positively to society and economic development.",
    dark: false,
  },
  {
    label: "Our Mission",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    text: "To provide quality, practical and industry-relevant vocational and safety training that equips learners with the technical knowledge, practical skills and confidence needed for employment, entrepreneurship and professional development.",
    dark: true,
  },
];

export default function VisionMission() {
  return (
    <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto max-w-(--container-site)">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Vision &amp; Mission
          </h2>
                  </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map(({ label, icon, text, dark }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className={`relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-8 ${dark ? "bg-navy text-on-navy" : "bg-surface text-ink"}`}>
                {/* ghost watermark */}
                <svg viewBox="0 0 256 256" aria-hidden="true" className={`pointer-events-none absolute -bottom-6 -right-6 w-40 opacity-[0.06] ${dark ? "fill-white" : "fill-navy"}`}>
                  <path d="M 180 0 C 221.974 0 256 34.026 256 76 L 256 256 L 180 256 C 138.026 256 104 221.974 104 180 C 104 138.026 138.026 104 180 104 L 208 104 L 208 76 C 208 60.536 195.464 48 180 48 L 76 48 C 60.536 48 48 60.536 48 76 L 48 180 C 48 195.464 60.536 208 76 208 L 96 208 L 96 256 L 76 256 C 34.026 256 0 221.974 0 180 L 0 76 C 0 34.026 34.026 0 76 0 Z" />
                </svg>

                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? "bg-white/10 text-on-navy" : "bg-navy/10 text-navy"}`}>
                  {icon}
                </div>

                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-orange" : "text-orange"}`}>
                    {label}
                  </p>
                  <p className={`mt-2 text-base leading-relaxed ${dark ? "text-on-navy/90" : "text-body"}`}>
                    {text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
