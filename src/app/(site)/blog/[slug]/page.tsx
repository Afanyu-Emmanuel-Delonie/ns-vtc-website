import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "../../../components/Button";
import Reveal from "../../../components/Reveal";
import { blogPosts, getBlogPost } from "../posts";
import { SITE_FULL_NAME } from "../../../constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { url: `/blog/${slug}`, type: "article", publishedTime: post.publishedAt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: SITE_FULL_NAME },
    publisher: { "@type": "Organization", name: "NS-VTC" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-navy-dark px-[clamp(16px,5vw,64px)] pb-16 pt-28">
        <div className="relative z-10 mx-auto max-w-(--container-site)">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            All Articles
          </Link>
          <time dateTime={post.publishedAt} className="mt-6 block font-body text-xs font-semibold uppercase tracking-widest text-orange">
            {new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h1 className="mt-2 max-w-3xl font-heading text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] text-white">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/60">{post.excerpt}</p>
        </div>
      </section>

      <section className="px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {post.sections.map((section, i) => (
            <Reveal key={i}>
              {section.heading && (
                <h2 className="font-heading text-xl font-bold text-ink">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mt-3 font-body text-sm leading-relaxed text-body">{p}</p>
              ))}
              {section.list && (
                <ul className="mt-3 flex flex-col gap-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-sm leading-relaxed text-body">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          <Reveal className="mt-4">
            <LinkButton href={post.relatedHref} variant="accent">{post.relatedLabel}</LinkButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
