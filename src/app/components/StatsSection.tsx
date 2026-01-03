import { motion } from 'motion/react';
import { Star, Users, Award, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function StatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: Star,
      value: '5.0',
      label: t('stats.rating'),
      suffix: '/5'
    },
    {
      icon: Users,
      value: '500+',
      label: t('stats.guests'),
      suffix: ''
    },
    {
      icon: Award,
      value: '100%',
      label: t('stats.reviews'),
      suffix: ''
    },
    {
      icon: Calendar,
      value: '95%',
      label: t('stats.occupancy'),
      suffix: ''
    }
  ];

  return (
    <section className="py-16 bg-[var(--matcha-brew)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                {stat.value}
              </div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}