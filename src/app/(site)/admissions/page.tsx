import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import AdmissionSections from "../../components/AdmissionSections";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to apply to NS-VTC in Bugesera, Rwanda: application steps, entry requirements and accommodation for TVET, HSE and corporate training programs.",
  alternates: { canonical: "/admissions" },
  openGraph: { url: "/admissions" },
};

export default function AdmissionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Admissions"
        title="How to Apply"
        description="A simple five-step application process to help you secure your place and start training at NS-VTC."
        actions={[
          { href: "/programs", label: "Explore Programs", variant: "accent" },
          { href: "/register", label: "Apply Now", variant: "secondaryOnDark" },
        ]}
      />
      <AdmissionSections applyHref="/register" applyLabel="Apply Now" />
    </main>
  );
}
