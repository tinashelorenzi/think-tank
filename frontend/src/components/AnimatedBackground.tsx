import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),rgba(17,24,39,0.9))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#7c3aed,#2563eb)] opacity-10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#4f46e5,#7c3aed,#2563eb)] opacity-10 blur-3xl" />
      </div>
    </div>
  );
};
