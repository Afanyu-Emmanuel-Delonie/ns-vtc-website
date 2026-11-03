import { Button } from "./Button";

const info = [
  {
    label: "Location",
    value: "Rilima Sector, Bugesera District, Eastern Province, Rwanda",
    icon: (
      <path d="M12 21s-7-5.33-7-11a7 7 0 1 1 14 0c0 5.67-7 11-7 11ZM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    ),
  },
  {
    label: "Telephone",
    value: "+250 788 986 489 · +250 799 528 247 · +250 799 524 906",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
    ),
  },
  {
    label: "Email",
    value: "newtonvtc@gmail.com",
    icon: (
      <path d="M4 4h16v16H4V4Zm0 0 8 8 8-8" />
    ),
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

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]"
    >
      <div className="mx-auto grid max-w-(--container-site) gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-navy">
            Get In Touch
          </p>
          <h2 className="mt-3 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
            Contact Us
          </h2>
          <p className="mt-4 max-w-md font-body text-[15px] leading-[1.6] text-body">
            Interested in joining one of our training programs, or need
            information about registration, course fees, training schedules
            or accommodation? Our team is ready to assist you.
          </p>

          <ul className="mt-8 flex flex-col gap-5">
            {info.map((item) => (
              <li key={item.label} className="flex gap-4">
                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface text-navy">
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
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <p className="font-body text-sm font-semibold text-ink">
                    {item.label}
                  </p>
                  <p className="font-body text-sm leading-[1.6] text-body">
                    {item.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form className="rounded-card border border-border bg-white p-6 sm:p-8">
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
                required
                className="min-h-11 w-full rounded-control border border-input bg-white px-3 font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              />
            </div>
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
                required
                className="min-h-11 w-full rounded-control border border-input bg-white px-3 font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div className="mt-4">
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
              required
              className="min-h-11 w-full rounded-control border border-input bg-white px-3 font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="subject"
              className="mb-1.5 block font-body text-sm font-medium text-ink"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="min-h-11 w-full rounded-control border border-input bg-white px-3 font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="course"
              className="mb-1.5 block font-body text-sm font-medium text-ink"
            >
              Course of Interest
            </label>
            <select
              id="course"
              name="course"
              defaultValue={courseOptions[0]}
              className="min-h-11 w-full rounded-control border border-input bg-white px-3 font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {courseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              required
              className="w-full rounded-control border border-input bg-white px-3 py-2.5 font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            />
          </div>

          <Button type="submit" variant="accent" className="mt-6 w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
