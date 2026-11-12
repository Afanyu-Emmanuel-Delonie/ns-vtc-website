import Image from "next/image";
import Reveal from "./Reveal";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function OurWork() {
  return (
    <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal>
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-navy">
            Our Work
          </p>
          <p className="mt-4 font-heading text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.3] text-ink">
            A look at NS-VTC in action: hands-on training, practical
            workshops and real learning environments where our students
            build the skills for their future.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-card">
            <Image
              src="/assets/hero.png"
              alt="Trainees at NS-VTC"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </div>
          <PhotoPlaceholder className="col-span-2 sm:col-span-1" />
          <PhotoPlaceholder className="col-span-2 sm:col-span-1" />
          <PhotoPlaceholder className="col-span-2" />
        </Reveal>
      </div>
    </section>
  );
}
