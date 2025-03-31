import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingShapeProps {
  delay: number;
  duration: number;
  size: number;
  color: string;
  style?: React.CSSProperties;
}

function FloatingShape({
  delay,
  duration,
  size,
  color,
  style,
}: FloatingShapeProps) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        ...style,
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <FloatingShape
        delay={0}
        duration={20}
        size={400}
        color="#4F46E5"
        style={{ top: "10%", left: "10%" }}
      />
      <FloatingShape
        delay={-5}
        duration={25}
        size={300}
        color="#10B981"
        style={{ top: "60%", right: "10%" }}
      />
      <FloatingShape
        delay={-10}
        duration={30}
        size={200}
        color="#F59E0B"
        style={{ bottom: "20%", left: "30%" }}
      />
      <FloatingShape
        delay={-15}
        duration={35}
        size={250}
        color="#EC4899"
        style={{ top: "30%", right: "30%" }}
      />
      <FloatingShape
        delay={-20}
        duration={40}
        size={350}
        color="#8B5CF6"
        style={{ bottom: "40%", right: "20%" }}
      />
    </div>
  );
}
