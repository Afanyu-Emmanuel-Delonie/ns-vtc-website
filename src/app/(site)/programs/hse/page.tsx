import type { Metadata } from "next";
import HseClient from "./HseClient";

export const metadata: Metadata = {
  title: "HSE Training in Rwanda",
  description:
    "Affordable occupational health and safety (HSE) training in Bugesera, Rwanda. Hazard identification, risk assessment, fire safety and workplace safety at NS-VTC.",
  alternates: { canonical: "/programs/hse" },
  openGraph: { url: "/programs/hse" },
};

export default function HsePage() {
  return <HseClient />;
}
