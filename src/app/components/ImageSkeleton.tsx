import { motion } from 'motion/react';

export function ImageSkeleton() {
  return (
    <motion.div
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute inset-0 bg-gradient-to-br from-[var(--almond)]/20 to-[var(--matcha-brew)]/10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </motion.div>
  );
}
