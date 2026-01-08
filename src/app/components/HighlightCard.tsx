import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function HighlightCard({ icon: Icon, title, description, index }: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(26, 54, 54, 0.15)' }}
      className="group relative bg-white rounded-3xl p-8 shadow-lg border border-[var(--forest-roast)]/5 transition-all overflow-hidden"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-[var(--almond)]/30 flex items-center justify-center mb-6 mx-auto sm:mx-0 group-hover:bg-[var(--matcha-brew)]/20 transition-colors">
          <Icon className="w-7 h-7 text-[var(--matcha-brew)]" />
        </div>
        
        <h3 className="text-xl mb-3 text-[var(--eclipse)]">{title}</h3>
        <p className="text-[var(--forest-roast)]/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
