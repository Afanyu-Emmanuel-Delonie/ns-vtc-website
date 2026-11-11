import type { ReactNode } from "react";
import { LinkButton } from "./Button";

const patternCells = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 6 }, (_, col) => {
    const distance = row + (5 - col);
    return Math.max(0, 1 - distance * 0.12);
  })
).flat();

type Action = { href: string; label: string; variant: "primary" | "secondary" | "secondaryOnDark" | "accent" };

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  image?: string;
  actions?: Action[];
};

export default function PageHero({ eyebrow, title, description, image, actions }: Props) {
  return (
    <section
      className={`relative flex min-h-[60vh] w-full items-center overflow-hidden bg-navy-dark${image ? " bg-cover bg-center" : ""}`}
      style={image ? { backgroundImage: `url('${image}')` } : undefined}
    >
      <div className={`absolute inset-0 ${image ? "bg-navy-dark/80" : "bg-navy-dark"}`} />
      <div
        className="pointer-events-none absolute -right-4 -top-4 grid grid-cols-6 gap-1.5"
        aria-hidden="true"
      >
        {patternCells.map((opacity, i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-xs bg-white"
            style={{ opacity: opacity * 0.4 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-(--container-site) flex-col items-center gap-3 px-4 pb-16 pt-28 text-center sm:px-8">
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-widest text-orange">{eyebrow}</span>
        )}
        <h1 className="font-heading text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] text-white">
          {title}
        </h1>
        {description && (
          <p className="max-w-xl font-body text-sm leading-relaxed text-white/70 sm:text-base">
            {description}
          </p>
        )}
        {actions && actions.length > 0 && (
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            {actions.map((a) => (
              <LinkButton key={a.href} href={a.href} variant={a.variant}>{a.label}</LinkButton>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
