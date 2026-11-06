import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import RevealItem from "./RevealItem";

const patternCells = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => {
    const distance = row + (4 - col);
    return Math.max(0, 1 - distance * 0.16);
  })
).flat();

const values = [
  {
    title: "Quality",
    description: "Maintaining high standards in training and skills development.",
    icon: <path d="M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM8.21 13.89 7 23l5-3 5 3-1.21-9.12" />,
  },
  {
    title: "Practical Excellence",
    description: "Promoting learning through real activities and practical experience.",
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  },
  {
    title: "Safety",
    description: "Encouraging safe working practices and responsibility.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 6v6m0 4h.01" />,
  },
  {
    title: "Integrity",
    description: "Promoting honesty, discipline and professionalism.",
    icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />,
  },
  {
    title: "Inclusiveness",
    description: "Providing equal learning opportunities for all.",
    icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  },
  {
    title: "Innovation",
    description: "Encouraging creativity, problem-solving and continuous improvement.",
    icon: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2Z" />,
  },
  {
    title: "Commitment",
    description: "Supporting learners in achieving their educational and career goals.",
    icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />,
  },
];

export default function CoreValues() {
  return (
    <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto max-w-(--container-site)">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange">What We Stand For</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Our Core Values
          </h2>
         
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            The principles that guide how we train, support and prepare every learner at NS-VTC.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 flex flex-wrap justify-center gap-3">
          {values.map((value) => (
            <RevealItem key={value.title} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]">
              <div className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-card bg-surface p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md">
                {/* dot grid watermark */}
                <div className="pointer-events-none absolute -right-2 -top-2 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {patternCells.map((opacity, i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-xs bg-white" style={{ opacity }} />
                  ))}
                </div>

                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {value.icon}
                  </svg>
                </span>
                <h3 className="relative font-heading text-[15px] font-bold text-ink transition-colors group-hover:text-white">
                  {value.title}
                </h3>
                <p className="relative font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-on-navy">
                  {value.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
