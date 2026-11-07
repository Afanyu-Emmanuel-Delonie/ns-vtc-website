import Link from "next/link";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import RevealItem from "./RevealItem";

const patternCells = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => {
    const distance = row + (4 - col);
    return Math.max(0, 1 - distance * 0.16);
  })
).flat();

const areas = [
  {
    href: "/programs/tvet",
    title: "TVET",
    description: "Trade-based courses in construction, metalwork, woodworking and garment production.",
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  },
  {
    href: "/programs/hse",
    title: "HSE Training",
    description: "Workplace safety, hazard identification and emergency preparedness.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 6v6m0 4h.01" />,
  },
  {
    href: "/corporate-training",
    title: "Corporate Training",
    description: "Build employee competence and workplace safety for your organisation.",
    icon: <path d="M3 21h18M6 21V8a1 1 0 0 1 1-1h3v14M14 21V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v17M9 11h.01M9 15h.01" />,
  },
  {
    href: "/programs/tvet",
    title: "Skills Development",
    description: "Hands-on exercises that build real confidence and practical competence.",
    icon: <path d="m12 2 2.9 6.26L22 9.27l-5 4.73L18.2 21 12 17.27 5.8 21 7 14l-5-4.73 7.1-1.01L12 2Z" />,
  },
];

export default function TrainingAreas() {
  return (
    <section className="px-4 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-(--container-site)">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
            Our Training Areas
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted sm:text-base">
            Practical, industry-aligned programmes designed to build real skills and open doors.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <RevealItem key={area.title}>
              <Link
                href={area.href}
                className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-card bg-surface p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-navy hover:shadow-md"
              >
                <div className="pointer-events-none absolute -right-2 -top-2 grid grid-cols-5 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {patternCells.map((opacity, i) => (
                    <span
                      key={i}
                      className="h-2.5 w-2.5 rounded-xs bg-white"
                      style={{ opacity }}
                    />
                  ))}
                </div>

                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {area.icon}
                  </svg>
                </span>
                <h3 className="relative font-heading text-[15px] font-bold text-ink transition-colors group-hover:text-white">
                  {area.title}
                </h3>
                <p className="relative font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-on-navy">
                  {area.description}
                </p>
                <span className="relative mt-auto font-body text-xs font-semibold text-navy transition-colors group-hover:text-white group-hover:underline">
                  Learn more →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
