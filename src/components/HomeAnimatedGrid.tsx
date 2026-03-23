"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HomeAnimatedGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-5"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className }: { children: ReactNode; className: string }) {
  return (
    <motion.section variants={itemVariants} className={className}>
      {children}
    </motion.section>
  );
}
