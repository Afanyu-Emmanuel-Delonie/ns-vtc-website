import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore open positions at Newton Safety and Vocational Training Center (NS-VTC) in Bugesera, Rwanda, or partner with us on workforce development and corporate training.",
  alternates: { canonical: "/careers" },
  openGraph: { url: "/careers" },
};

export default function CareersPage() {
  return <CareersClient />;
}
