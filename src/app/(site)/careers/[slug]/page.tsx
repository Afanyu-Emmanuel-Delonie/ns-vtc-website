import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import JobDetailClient from "./JobDetailClient";

export async function generateStaticParams() {
  const snap = await getDocs(collection(db, "jobs"));
  const slugs = snap.docs.map((d) => d.id);
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "_" }];
}

export default function JobDetailPage() {
  return <JobDetailClient />;
}
