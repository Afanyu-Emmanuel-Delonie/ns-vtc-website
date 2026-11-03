import { LinkButton } from "./Button";

export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto flex max-w-(--container-site) flex-col items-center gap-6 px-4 py-24 text-center sm:px-8">
        <h1 className="max-w-4xl font-heading text-[clamp(38px,5vw,60px)] font-extrabold leading-[1.08] text-white">
          Build Your Skills. Secure Your Future.
        </h1>
        <p className="max-w-2xl font-body text-base leading-[1.6] text-on-navy sm:text-[19px]">
          NS-VTC is a vocational and professional training institution in
          Rilima Sector, Bugesera District, committed to empowering young
          people and professionals through practical skills development,
          technical education and workplace safety training.
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <LinkButton href="/register" variant="primary">
            Enroll Now
          </LinkButton>
          <LinkButton href="/programs" variant="secondaryOnDark">
            Explore Our Courses
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
