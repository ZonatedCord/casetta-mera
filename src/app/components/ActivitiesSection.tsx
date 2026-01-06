import { useState } from 'react';
import { motion } from 'motion/react';
import { ActivityCard } from './ActivityCard';
import { Snowflake, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ActivitiesSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('winter');

  const winterActivities = [
    {
      title: t('activities.winterCards.ski.title'),
      description: t('activities.winterCards.ski.description'),
      image: 'https://images.unsplash.com/photo-1556217603-efec4f7fd871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNraWluZyUyMHNub3d8ZW58MXx8fHwxNzY2OTYzODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: t('activities.winterCards.ski.alt'),
      link: 'https://alpedimera.it/'
    },
    {
      title: t('activities.winterCards.snowshoeing.title'),
      description: t('activities.winterCards.snowshoeing.description'),
      image: '/ciaspole.jpg',
      alt: t('activities.winterCards.snowshoeing.alt'),
      link: 'https://alpedimera.it/percorsi-ciaspole-alpe-di-mera-24771'
    },
    {
      title: t('activities.winterCards.playground.title'),
      description: t('activities.winterCards.playground.description'),
      image: '/areaGiochi.jpg',
      alt: t('activities.winterCards.playground.alt'),
      link: 'https://alpedimera.it/i-parchi-giochi-sulla-neve-24777'
    }
  ];

  const summerActivities = [
    {
      title: t('activities.summerCards.hiking.title'),
      description: t('activities.summerCards.hiking.description'),
      image: '/trekking.jpg',
      alt: t('activities.summerCards.hiking.alt'),
      link: 'https://alpedimera.it/alpe-di-mera-estate-famiglia-22178'
    },
    {
      title: t('activities.summerCards.bike.title'),
      description: t('activities.summerCards.bike.description'),
      image: '/mtb.jpeg',
      alt: t('activities.summerCards.bike.alt'),
      link: 'https://www.skiforum.it/alpedimera/estate.html'
    },
    {
      title: t('activities.summerCards.rafting.title'),
      description: t('activities.summerCards.rafting.description'),
      image: '/rafting.jpg',
      alt: t('activities.summerCards.rafting.alt'),
      link: 'https://www.valsesiasport.it/'
    }
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
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">{t('activities.title')}</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('activities.subtitle')}
          </p>
        </motion.div>

        {/* Redesigned Season Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-[var(--almond)]/15 p-1.5 rounded-2xl shadow-sm border border-[var(--forest-roast)]/5">
            <button
              onClick={() => setActiveTab('winter')}
              className={`
                relative px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2
                ${activeTab === 'winter' 
                  ? 'bg-white text-[var(--eclipse)] shadow-md' 
                  : 'text-[var(--forest-roast)]/60 hover:text-[var(--eclipse)]'
                }
              `}
            >
              <Snowflake className="w-4 h-4" />
              <span className="font-medium">{t('activities.winter')}</span>
              {activeTab === 'winter' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-md"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('summer')}
              className={`
                relative px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2
                ${activeTab === 'summer' 
                  ? 'bg-white text-[var(--eclipse)] shadow-md' 
                  : 'text-[var(--forest-roast)]/60 hover:text-[var(--eclipse)]'
                }
              `}
            >
              <Sun className="w-4 h-4" />
              <span className="font-medium">{t('activities.summer')}</span>
              {activeTab === 'summer' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-md"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Activities Grid with Animation */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(activeTab === 'winter' ? winterActivities : summerActivities).map((activity, index) => (
            <ActivityCard
              key={index}
              {...activity}
              linkLabel={t('activities.learnMore')}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
