import { Button } from "./Button";
import CourseSelect from "./CourseSelect";

const patternCells = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 6 }, (_, col) => {
    const distance = row + (5 - col);
    return Math.max(0, 1 - distance * 0.12);
  })
).flat();

const info = [
  {
    label: "Call & WhatsApp",
    lines: ["+250 788 986 489", "+250 799 528 247", "+250 799 524 906"],
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
    ),
  },
  {
    label: "Visit Us",
    lines: ["Rilima Sector, Bugesera District", "Eastern Province, Rwanda"],
    icon: (
      <path d="M12 21s-7-5.33-7-11a7 7 0 1 1 14 0c0 5.67-7 11-7 11ZM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    ),
  },
  {
    label: "Write to Us",
    lines: ["newtonvtc@gmail.com"],
    icon: <path d="M4 4h16v16H4V4Zm0 0 8 8 8-8" />,
  },
];

const courseOptions = [
  "General Inquiry",
  "Scaffolding",
  "Steel Fixing",
  "Tailoring",
  "Welding",
  "Carpentry",
  "Painting",
  "HSE",
  "Masonry",
  "Corporate Training",
];

const inputClass =
  "min-h-11 w-full rounded-control border border-border bg-white px-3 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]"
    >
      <div className="mx-auto max-w-(--container-site)">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-4 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
              Get In Touch
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm leading-[1.6] text-muted sm:text-right">
            Tell us which programme you&apos;re interested in and our team
            will get back to you with registration details.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-card border border-border bg-white lg:grid-cols-[1.4fr_1fr]">
          <form className="p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block font-body text-sm font-medium text-ink"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-body text-sm font-medium text-ink"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block font-body text-sm font-medium text-ink"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+250 7xx xxx xxx"
                  required
                  className={inputClass}
                />
              </div>
              <CourseSelect
                label="Course of Interest"
                name="course"
                options={courseOptions}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-1.5 block font-body text-sm font-medium text-ink"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us a bit more"
                required
                className="w-full rounded-control border border-border bg-white px-3 py-2.5 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              />
            </div>

            <Button type="submit" variant="accent" className="mt-6">
              Send Message
            </Button>
          </form>

          <div
            className="relative hidden min-h-full flex-col justify-between bg-cover bg-center p-8 lg:flex"
            style={{ backgroundImage: "url('/assets/hero.png')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10" />

            <div className="pointer-events-none absolute -right-3 -top-3 z-10 grid grid-cols-6 gap-1">
              {patternCells.map((opacity, i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-xs bg-white"
                  style={{ opacity }}
                />
              ))}
            </div>

            <span className="relative inline-flex w-fit items-center rounded-full border border-white/30 px-3 py-1 font-body text-xs font-semibold text-white">
              Visit NS-VTC
            </span>

            <div className="relative">
              <p className="font-heading text-2xl font-extrabold leading-[1.15] text-white">
                Rilima Sector, Bugesera District
              </p>
              <p className="mt-2 font-body text-sm leading-[1.6] text-on-navy">
                Eastern Province, Rwanda. Accommodation available for both
                male and female trainees.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {info.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface text-navy">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </span>
              <p className="mt-4 font-heading text-base font-bold text-ink">
                {item.label}
              </p>
              {item.lines.map((line) => (
                <p
                  key={line}
                  className="mt-1 font-body text-sm leading-[1.6] text-body"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
