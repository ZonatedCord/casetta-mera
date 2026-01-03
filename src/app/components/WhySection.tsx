import { motion } from 'motion/react';
import { HighlightCard } from './HighlightCard';
import { Eye, MountainSnow, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function WhySection() {
  const { t } = useLanguage();
  
  const highlights = [
    {
      icon: Eye,
      title: t('why.breathtakingView.title'),
      description: t('why.breathtakingView.description')
    },
    {
      icon: MountainSnow,
      title: t('why.nearLifts.title'),
      description: t('why.nearLifts.description')
    },
    {
      icon: Heart,
      title: t('why.familyFriendly.title'),
      description: t('why.familyFriendly.description')
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[var(--almond)]/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">{t('why.title')}</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('why.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              {...highlight}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}