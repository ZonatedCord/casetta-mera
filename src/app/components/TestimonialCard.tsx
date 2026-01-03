import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  index: number;
}

export function TestimonialCard({ name, location, rating, comment, date, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl p-8 shadow-lg border border-[var(--forest-roast)]/5 h-full flex flex-col"
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? 'fill-[var(--almond)] text-[var(--almond)]'
                : 'text-[var(--forest-roast)]/20'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-[var(--forest-roast)]/80 leading-relaxed mb-6 flex-1">
        "{comment}"
      </p>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--forest-roast)]/10">
        <div>
          <p className="text-[var(--eclipse)]">{name}</p>
          <p className="text-sm text-[var(--forest-roast)]/60">{location}</p>
        </div>
        <span className="text-sm text-[var(--forest-roast)]/60">{date}</span>
      </div>
    </motion.div>
  );
}
