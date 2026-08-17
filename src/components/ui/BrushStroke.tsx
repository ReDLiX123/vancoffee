"use client";

import React from "react";
import { motion } from "framer-motion";

interface BrushStrokeProps {
  variant?: 0 | 1 | 2;
  className?: string;
  color?: string;
}

const BRUSH_PATHS = [
  // Variant 0: Natural subtle arc with expressive taper
  "M 2 7.5 C 24 3.8, 56 10.2, 88 5.2 C 104 3.2, 118 7.8, 128 5.5",
  // Variant 1: Expressive wave with artistic flourish
  "M 3 5.8 C 28 8.8, 62 4.2, 92 7.8 C 108 9.2, 119 5.0, 127 6.8",
  // Variant 2: Confident calligraphic swipe with slight curvature
  "M 2 6.8 C 32 4.5, 68 8.5, 96 4.8 C 112 5.5, 121 7.8, 128 6.2",
];

export const BrushStroke: React.FC<BrushStrokeProps> = ({
  variant = 0,
  className = "",
  color = "var(--theme-accent)",
}) => {
  const pathData = BRUSH_PATHS[variant % BRUSH_PATHS.length];

  return (
    <div className={`pointer-events-none absolute -bottom-1 left-0 right-0 h-2.5 overflow-visible ${className}`}>
      <svg
        viewBox="0 0 130 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Soft shadow / atmospheric ink blur */}
        <motion.path
          d={pathData}
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="blur-[1.5px]"
        />

        {/* Crisp core stroke */}
        <motion.path
          d={pathData}
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.95 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
};
