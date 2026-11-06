"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { LinkButton } from "./Button";

const slides = [
  {
    image: "/assets/hero.png",
    heading: <>Build Your Skills.<br />Secure Your Future.</>,
    sub: "Empowering young people through practical skills, technical education, and workplace safety training.",
  },
  {
    image: "/assets/contact.png",
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

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 50000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate flex min-h-[80vh] w-full items-center overflow-hidden md:min-h-screen 2xl:min-h-[80vh]">
      {/* slides */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${slides[current].image}')` }}
        />
      </AnimatePresence>

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
