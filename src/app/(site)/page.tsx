import type { Metadata } from "next";
import Hero from "../components/Hero";
import TrainingAreas from "../components/TrainingAreas";
import FeaturedCourses from "../components/FeaturedCourses";
import WhyChooseUs from "../components/WhyChooseUs";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";

export const metadata: Metadata = {
  title: "NS-VTC | Vocational Training in Rwanda",
  description:
    "NS-VTC offers practical TVET, HSE and corporate training programs in Bugesera District, Rwanda. Build your skills and secure your future.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TrainingAreas />
      <WhyChooseUs />
      <FeaturedCourses />
      <Contact />
      <FAQ />
    </main>
  );
}
