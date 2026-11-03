import { LinkButton } from "./components/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 pb-20 pt-32 text-center">
      <div className="relative flex flex-col items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-heading text-[clamp(120px,22vw,260px)] font-extrabold leading-none text-border"
        >
          404
        </span>

        <h1 className="font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-sm font-body text-[15px] leading-[1.6] text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <LinkButton href="/" variant="solid" className="mt-8">
          Go to Home
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </LinkButton>
      </div>
    </main>
  );
}
