import { LinkButton } from "./Button";

export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[80vh] md:min-h-screen 2xl:min-h-[80vh] w-full items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto flex w-full max-w-(--container-site) flex-col items-center gap-6 px-4 py-16 text-center sm:px-8 md:py-20 2xl:py-24">
        <h1 className="max-w-4xl font-heading text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.08] text-white">
          Build Your Skills.<br />Secure Your Future.
        </h1>
        <p className="max-w-xl font-body text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
          Empowering young people through practical skills, technical education, and workplace safety training.
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 px-6 sm:w-auto sm:flex-row sm:px-0">
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
