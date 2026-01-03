import { motion } from 'motion/react';
import { ServiceIcon } from './ServiceIcon';
import { 
  Wifi, 
  Utensils, 
  Tv, 
  Snowflake, 
  Flame, 
  Coffee,
  Mountain,
  CircleParking,
  Dog,
  Waves,
  Wind,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ServicesSection() {
  const { t } = useLanguage();
  
  const services = [
    { icon: Wifi, label: t('services.wifi'), category: 'comfort' },
    { icon: Utensils, label: t('services.kitchen'), category: 'comfort' },
    { icon: Tv, label: t('services.tv'), category: 'comfort' },
    { icon: Snowflake, label: t('services.ac'), category: 'comfort' },
    { icon: Flame, label: t('services.fireplace'), category: 'comfort' },
    { icon: Coffee, label: t('services.coffee'), category: 'comfort' },
    { icon: Wind, label: t('services.heating'), category: 'comfort' },
    { icon: Mountain, label: t('services.mountainView'), category: 'location' },
    { icon: CircleParking, label: t('services.parking'), category: 'location' },
    { icon: Dog, label: t('services.pets'), category: 'extras' },
    { icon: Waves, label: t('services.jacuzzi'), category: 'extras' },
    { icon: Zap, label: t('services.evCharger'), category: 'extras' },
  ];

  const categories = {
    comfort: { 
      title: t('services.categories.comfort.title'), 
      description: t('services.categories.comfort.description') 
    },
    location: { 
      title: t('services.categories.location.title'), 
      description: t('services.categories.location.description') 
    },
    extras: { 
      title: t('services.categories.extras.title'), 
      description: t('services.categories.extras.description') 
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[var(--almond)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">{t('services.title')}</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services by Category - All Open */}
        <div className="space-y-12">
          {Object.entries(categories).map(([key, { title, description }], categoryIndex) => {
            const categoryServices = services.filter((s) => s.category === key);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white rounded-3xl shadow-lg border border-[var(--forest-roast)]/5 overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-[var(--forest-roast)]/5">
                  <h3 className="text-2xl text-[var(--eclipse)] mb-1">{title}</h3>
                  <p className="text-sm text-[var(--forest-roast)]/60">{description}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                  {categoryServices.map((service, index) => (
                    <ServiceIcon
                      key={index}
                      icon={service.icon}
                      label={service.label}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}