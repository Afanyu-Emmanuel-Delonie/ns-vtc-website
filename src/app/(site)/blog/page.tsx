import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import RevealGroup from "../../components/RevealGroup";
import RevealItem from "../../components/RevealItem";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and articles on vocational training, HSE training and admissions at NS-VTC in Bugesera, Rwanda.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <main>
      <PageHero
        eyebrow="NS-VTC Blog"
        title="Guides & Articles"
        description="Practical guides on our training programs, admissions and workplace safety in Rwanda."
      />

      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto max-w-(--container-site)">
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RevealItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <time dateTime={post.publishedAt} className="font-body text-xs font-semibold uppercase tracking-widest text-orange">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                  <h2 className="mt-3 font-heading text-lg font-bold text-ink">{post.title}</h2>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <span className="mt-4 font-body text-sm font-semibold text-navy group-hover:underline">
                    Read more &rarr;
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          {posts.length === 0 && (
            <Reveal className="text-center">
              <p className="font-body text-sm text-muted">No articles published yet. Check back soon.</p>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
