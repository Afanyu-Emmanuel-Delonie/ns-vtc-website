import type { Metadata } from "next";
import Hero from "../components/Hero";
import TrainingAreas from "../components/TrainingAreas";
import FeaturedCourses from "../components/FeaturedCourses";
import WhyChooseUs from "../components/WhyChooseUs";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import { faqs } from "../constants";

export const metadata: Metadata = {
  title: "Vocational Training in Bugesera, Rwanda",
  description:
    "NS-VTC offers practical TVET, HSE and corporate training in Bugesera, Rwanda — scaffolding, welding, masonry, carpentry and more.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TrainingAreas />
      <WhyChooseUs />
      <FeaturedCourses />
      <Contact />
      <FAQ />
    </main>
  );
}
