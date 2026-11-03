import { LinkButton } from "./Button";
import Reveal from "./Reveal";

export default function WhoWeAre() {
  return (
    <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto max-w-(--container-site)">
       

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal delay={0.1} className="text-center lg:text-left">
            <blockquote className="font-heading text-base italic leading-relaxed text-ink sm:text-lg">
              &ldquo;NS-VTC is dedicated to providing practical vocational
              education, technical skills development and occupational
              health and safety training that responds to the needs of
              individuals, employers and the wider community. We aim to
              prepare our trainees to become competent, responsible and
              productive individuals.&rdquo;
            </blockquote>
            <div className="mt-6 flex justify-center lg:justify-start">
              <LinkButton href="/programs" variant="accent">
                Explore Our Training
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="grid grid-cols-3 items-center gap-3">
            {[
              { src: "/assets/hero.png", h: "h-52 sm:h-60" },
              { src: "/assets/contact.png", h: "h-72 sm:h-80" },
              { src: "/assets/hero.png", h: "h-52 sm:h-60" },
            ].map(({ src, h }, i) => (
              <div
                key={i}
                className={`${h} rounded-3xl bg-cover bg-center`}
                style={{ backgroundImage: `url('${src}')` }}
                role="img"
                aria-label="NS-VTC training"
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
