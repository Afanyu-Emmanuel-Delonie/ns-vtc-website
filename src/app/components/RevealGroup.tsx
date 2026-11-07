"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
  className?: string;
};

export default function RevealGroup({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = gsap.utils.toArray<HTMLElement>(ref.current.children);
      if (!items.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 36, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
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
