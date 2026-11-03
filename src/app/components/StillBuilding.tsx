import { LinkButton } from "./Button";

export default function StillBuilding({ page }: { page: string }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy px-4 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" fill="none" aria-hidden="true">
          <path d="M 180 0 C 221.974 0 256 34.026 256 76 L 256 256 L 208 256 L 208 76 C 208 60.536 195.464 48 180 48 C 164.536 48 152 60.536 152 76 L 152 180 C 152 221.974 117.974 256 76 256 C 34.026 256 0 221.974 0 180 L 0 0 L 48 0 L 48 180 C 48 195.464 60.536 208 76 208 C 91.464 208 104 195.464 104 180 L 104 76 C 104 34.026 138.026 0 180 0 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange">
          Coming Soon
        </p>
        <h1 className="font-heading text-[clamp(28px,4vw,48px)] font-extrabold text-white">
          {page} is Still Being Built
        </h1>
        <p className="max-w-sm font-body text-sm leading-relaxed text-on-navy/70">
          We're working hard on this page. Check back soon or get in touch with us directly.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/" variant="primary">Back to Home</LinkButton>
          <LinkButton href="/#contact" variant="secondaryOnDark">Contact Us</LinkButton>
        </div>
      </div>
    </main>
  );
}
