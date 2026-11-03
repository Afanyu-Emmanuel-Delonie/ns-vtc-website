import Hero from "./components/Hero";
import TrainingAreas from "./components/TrainingAreas";
import FeaturedCourses from "./components/FeaturedCourses";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrainingAreas />
      <WhyChooseUs />
    </main>
  );
}
