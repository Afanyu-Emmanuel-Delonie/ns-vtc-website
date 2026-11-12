import type { Metadata } from "next";
import Link from "next/link";
import Hero from "../components/Hero";
import TrainingAreas from "../components/TrainingAreas";
import FeaturedCourses from "../components/FeaturedCourses";
import WhyChooseUs from "../components/WhyChooseUs";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Reveal from "../components/Reveal";
import RevealGroup from "../components/RevealGroup";
import RevealItem from "../components/RevealItem";
import { faqs } from "../constants";
import { blogPosts } from "./blog/posts";

export const metadata: Metadata = {
  title: "Vocational Training in Bugesera, Rwanda",
  description:
    "NS-VTC offers practical TVET, HSE and corporate training in Bugesera, Rwanda — scaffolding, welding, masonry, carpentry and more.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TrainingAreas />
      <WhyChooseUs />
      <FeaturedCourses />
      <Contact />
      <FAQ />

      {/* From Our Blog */}
      <section className="border-t border-border px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <Reveal className="flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange">From the Blog</span>
              <h2 className="mt-1 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Guides &amp; Resources</h2>
            </div>
            <Link href="/blog" className="font-body text-sm font-semibold text-navy transition-colors hover:underline">
              All articles &rarr;
            </Link>
          </Reveal>

          <RevealGroup className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
            {blogPosts.map((post) => (
              <RevealItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col bg-white p-6 transition-colors duration-200 hover:bg-navy"
                >
                  <time
                    dateTime={post.publishedAt}
                    className="font-body text-[10px] font-semibold uppercase tracking-widest text-muted transition-colors group-hover:text-white/50"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                  <h3 className="mt-3 font-heading text-base font-bold leading-snug text-ink transition-colors group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-xs leading-relaxed text-muted transition-colors group-hover:text-white/70">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 font-body text-xs font-semibold text-navy transition-colors group-hover:text-white group-hover:underline">
                    Read article
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
