import type { MetadataRoute } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { tvetCourses } from "./constants";
import { blogPosts } from "./(site)/blog/posts";

export const dynamic = "force-static";

const siteUrl = "https://newtonsafetyvtc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/admissions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/programs/tvet`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/programs/hse`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/corporate-training`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/careers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = tvetCourses.map((course) => ({
    url: `${siteUrl}/programs/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  let jobRoutes: MetadataRoute.Sitemap = [];
  try {
    const snap = await getDocs(query(collection(db, "jobs"), where("archived", "==", false)));
    jobRoutes = snap.docs.map((d) => ({
      url: `${siteUrl}/careers/${d.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch {
    // Firestore unreachable at build time — ship the sitemap without job postings rather than failing the build.
  }

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...jobRoutes];
}
