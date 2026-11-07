"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(ref.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
