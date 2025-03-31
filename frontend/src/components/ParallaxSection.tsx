import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ParallaxSection({
  children,
  className = "",
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative ${className}`}
      id={id}
    >
      {children}
    </motion.div>
  );
}
