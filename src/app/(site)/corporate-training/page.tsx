import type { Metadata } from "next";
import CorporateTrainingClient from "./CorporateTrainingClient";

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Workplace safety and skills training for companies, contractors and institutions in Rwanda. Tailored HSE and technical training delivered on-site or at NS-VTC, Bugesera.",
  alternates: { canonical: "/corporate-training" },
  openGraph: { url: "/corporate-training" },
};

export default function CorporateTrainingPage() {
  return <CorporateTrainingClient />;
}
