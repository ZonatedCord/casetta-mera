import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceIconProps {
  icon: LucideIcon;
  label: string;
  index: number;
}

export function ServiceIcon({ icon: Icon, label, index }: ServiceIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[var(--almond)]/10 hover:bg-[var(--almond)]/20 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
        <Icon className="w-6 h-6 text-[var(--matcha-brew)]" />
      </div>
      <span className="text-sm text-center text-[var(--forest-roast)]">{label}</span>
    </motion.div>
  );
}
