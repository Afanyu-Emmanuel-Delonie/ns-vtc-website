"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { revealItemVariants } from "./RevealGroup";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function RevealItem({ children, className }: Props) {
  return (
    <motion.div variants={revealItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
