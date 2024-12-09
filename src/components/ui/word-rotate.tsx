"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  className?: string;
  color?: string; // Added color prop
  fontFamily?: string; // Added fontFamily prop
}

export default function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  color = "black", // Default color set to black
  fontFamily = "'Dancing Script', cursive", // Default fontFamily set to Dancing Script
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      {/* Add Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Pinyon+Script&family=Satisfy&display=swap"
        rel="stylesheet"
      />
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn(className)}
          {...framerProps}
          style={{ color, fontFamily }} // Added style to set color and fontFamily
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
