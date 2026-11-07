import { LinkButton } from "./Button";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import RevealItem from "./RevealItem";

const commitments = [
  "Providing quality, practical vocational education.",
  "Promoting occupational health and safety at every stage.",
  "Empowering young people and women through skills development.",
  "Building strong partnerships with employers and industry.",
];

export default function OurCommitment() {
  return (
    <section className="relative isolate overflow-hidden px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero.png')" }}
        role="img"
        aria-label="Trainees at NS-VTC"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />

      <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-bold uppercase tracking-widest text-orange">
            What Drives Us
          </span>
          <h2 className="mt-2 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-white">
            Our Commitment
          </h2>
          <p className="mt-4 font-body text-[15px] leading-[1.6] text-on-navy">
            Every program we run is anchored on the same set of promises
            to our trainees, their families and the employers who rely on
            the skills we build.
          </p>
          <div className="mt-6">
            <LinkButton href="/#contact" variant="secondaryOnDark">
              Partner With Us
            </LinkButton>
          </div>
        </Reveal>

        <RevealGroup className="divide-y divide-white/15">
          {commitments.map((item, i) => (
            <RevealItem
              key={item}
              className="flex items-start gap-4 py-4 first:pt-0"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 text-white shadow-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p className="pt-1.5 font-body text-[15px] leading-[1.6] text-on-navy">
                {item}
              </p>
              <span
                className="ml-auto hidden flex-none pt-1 font-heading text-2xl font-extrabold text-white/10 sm:block"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
