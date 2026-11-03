import Hero from "./components/Hero";
import TrainingAreas from "./components/TrainingAreas";
import FeaturedCourses from "./components/FeaturedCourses";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";

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
