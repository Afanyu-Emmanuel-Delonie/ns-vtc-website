import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import OurWork from "../../components/OurWork";
import WhoWeAre from "../../components/WhoWeAre";
import VisionMission from "../../components/VisionMission";
import CoreValues from "../../components/CoreValues";
import OurCommitment from "../../components/OurCommitment";
import TrainingApproach from "../../components/TrainingApproach";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Newton Safety and Vocational Training Center (NS-VTC) — our vision, mission, core values and training approach in Bugesera District, Rwanda.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About NS-VTC"
        title="Who We Are"
        description="A vocational training institution in Rilima Sector, Bugesera District, committed to practical skills development and workplace safety."
        
      />
      <WhoWeAre />
      <VisionMission />
      <CoreValues />
      <OurCommitment />
      <TrainingApproach />
    </main>
  );
}
