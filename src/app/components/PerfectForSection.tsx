import { motion } from 'motion/react';
import { Users, Heart, Sparkles, Mountain, Laptop } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PerfectForSection() {
  const { t } = useLanguage();
  
  const audiences = [
    {
      icon: Users,
      title: t('perfectFor.families.title'),
      description: t('perfectFor.families.description'),
    },
    {
      icon: Heart,
      title: t('perfectFor.couples.title'),
      description: t('perfectFor.couples.description'),
    },
    {
      icon: Sparkles,
      title: t('perfectFor.groups.title'),
      description: t('perfectFor.groups.description'),
    },
    {
      icon: Mountain,
      title: t('perfectFor.skiers.title'),
      description: t('perfectFor.skiers.description'),
    },
    {
      icon: Laptop,
      title: t('perfectFor.smartWorking.title'),
      description: t('perfectFor.smartWorking.description'),
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">{t('perfectFor.title')}</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('perfectFor.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-[var(--forest-roast)]/5 hover:shadow-xl transition-all cursor-default"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--almond)]/20 flex items-center justify-center group-hover:bg-[var(--almond)]/30 transition-colors">
                    <Icon className="w-8 h-8 text-[var(--matcha-brew)]" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-[var(--eclipse)]">{audience.title}</h3>
                    <p className="text-sm text-[var(--forest-roast)]/70 leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}