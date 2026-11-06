"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { LinkButton } from "./Button";

const slides = [
  {
    image: "/assets/hero.png",
    heading: <>Build Your Skills.<br />Secure Your Future.</>,
    sub: "Empowering young people through practical skills, technical education, and workplace safety training.",
  },
  {
    image: "/assets/hero1.png",
    heading: <>Learn. Practice.<br />Develop. Succeed.</>,
    sub: "Hands-on vocational training designed to get you job-ready from day one.",
  },
  {
    image: "/assets/hero.png",
    heading: <>Your Career<br />Starts Here.</>,
    sub: "Join NS-VTC and take the first step toward becoming a skilled, confident professional.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // resolve anyway so slider never gets stuck
    img.src = src;
  });
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>([true, false, false]); // first slide assumed loaded

  // preload next slide in background
  const preloadNext = useCallback(async (index: number) => {
    if (loaded[index]) return;
    await preloadImage(slides[index].image);
    setLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, [loaded]);

  // preload slide 2 after first render
  useEffect(() => {
    preloadNext(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-advance only when next slide is loaded
  useEffect(() => {
    const nextIndex = (current + 1) % slides.length;

    if (!loaded[nextIndex]) {
      // wait for it to load then advance
      preloadImage(slides[nextIndex].image).then(() => {
        setLoaded((prev) => {
          const next = [...prev];
          next[nextIndex] = true;
          return next;
        });
      });
      return;
    }

    const timer = setTimeout(() => {
      setCurrent(nextIndex);
      // preload the one after next
      const afterNext = (nextIndex + 1) % slides.length;
      preloadNext(afterNext);
    }, 4000);

    return () => clearTimeout(timer);
  }, [current, loaded, preloadNext]);

  return (
    <section className="relative isolate flex min-h-[80vh] w-full items-center overflow-hidden md:min-h-screen 2xl:min-h-[80vh]">
      {/* preloaded bg layers — only render when loaded */}
      {slides.map((slide, i) =>
        loaded[i] ? (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ) : null
      )}

      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current + "-content"}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={container}
          className="relative z-10 mx-auto flex w-full max-w-(--container-site) flex-col items-center gap-6 px-4 py-16 text-center sm:px-8 md:py-20 2xl:py-24"
        >
          <motion.h1
            variants={item}
            className="max-w-4xl font-heading text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.08] text-white"
          >
            {slides[current].heading}
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-xl font-body text-sm leading-relaxed text-white/70 sm:text-base md:text-lg"
          >
            {slides[current].sub}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-2 flex w-full flex-col gap-3 px-6 sm:w-auto sm:flex-row sm:px-0"
          >
            <LinkButton href="/register" variant="primary">Enroll Now</LinkButton>
            <LinkButton href="/programs" variant="secondaryOnDark">Explore Our Courses</LinkButton>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
