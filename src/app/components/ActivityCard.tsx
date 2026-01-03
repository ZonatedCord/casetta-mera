import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ActivityCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  index: number;
}

export function ActivityCard({ title, description, image, link, index }: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-[var(--forest-roast)]/5"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--eclipse)]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl mb-2 text-[var(--eclipse)]">{title}</h3>
        <p className="text-[var(--forest-roast)]/70 mb-4 leading-relaxed">{description}</p>
        
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--matcha-brew)] hover:text-[var(--eclipse)] transition-colors"
          >
            <span>Scopri di più</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
