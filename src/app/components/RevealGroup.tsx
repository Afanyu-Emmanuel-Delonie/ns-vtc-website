"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

type Props = {
  children: ReactNode;
  className?: string;
};

export default function RevealGroup({ children, className }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={groupVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
