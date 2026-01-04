import { motion } from 'motion/react';
import { ServiceIcon } from './ServiceIcon';
import { 
  Wifi, 
  Utensils, 
  Tv, 
  Thermometer, 
  Flame, 
  Coffee,
  BedDouble,
  MountainSnow,
  CircleParking,
  Dog,
  Accessibility,
  ShowerHead,
  Backpack,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ServicesSection() {
  const { t } = useLanguage();
  
  const services = [
    { 
      icon: Wifi, 
      title: t('services.items.wifi.title'), 
      description: t('services.items.wifi.description'), 
      category: 'comfort' 
    },
    { 
      icon: Utensils, 
      title: t('services.items.kitchen.title'), 
      description: t('services.items.kitchen.description'), 
      category: 'comfort' 
    },
    { 
      icon: Tv, 
      title: t('services.items.tv.title'), 
      description: t('services.items.tv.description'), 
      category: 'comfort' 
    },
    { 
      icon: Thermometer, 
      title: t('services.items.heating.title'), 
      description: t('services.items.heating.description'), 
      category: 'comfort' 
    },
    { 
      icon: Flame, 
      title: t('services.items.fireplace.title'), 
      description: t('services.items.fireplace.description'), 
      category: 'comfort' 
    },
    { 
      icon: Coffee, 
      title: t('services.items.moka.title'), 
      description: t('services.items.moka.description'), 
      category: 'comfort' 
    },
    { 
      icon: BedDouble, 
      title: t('services.items.linens.title'), 
      description: t('services.items.linens.description'), 
      category: 'comfort' 
    },
    { 
      icon: MountainSnow, 
      title: t('services.items.monteRosaView.title'), 
      description: t('services.items.monteRosaView.description'), 
      category: 'location' 
    },
    { 
      icon: CircleParking, 
      title: t('services.items.parkingSummer.title'), 
      description: t('services.items.parkingSummer.description'), 
      category: 'location' 
    },
    { 
      icon: Dog, 
      title: t('services.items.pets.title'), 
      description: t('services.items.pets.description'), 
      category: 'extras' 
    },
    { 
      icon: Accessibility, 
      title: t('services.items.accessibility.title'), 
      description: t('services.items.accessibility.description'), 
      category: 'extras' 
    },
    { 
      icon: ShowerHead, 
      title: t('services.items.accessibleShower.title'), 
      description: t('services.items.accessibleShower.description'), 
      category: 'extras' 
    },
    { 
      icon: Backpack, 
      title: t('services.items.skiStorage.title'), 
      description: t('services.items.skiStorage.description'), 
      category: 'extras' 
    },
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
                      title={service.title}
                      description={service.description}
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
