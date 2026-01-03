import { useState } from 'react';
import { motion } from 'motion/react';
import { ActivityCard } from './ActivityCard';
import { Snowflake, Sun } from 'lucide-react';

export function ActivitiesSection() {
  const [activeTab, setActiveTab] = useState('winter');

  const winterActivities = [
    {
      title: 'Ski Alpe di Mera',
      description: 'Accesso diretto agli impianti sciistici con piste per tutti i livelli. Skipass disponibili online.',
      image: 'https://images.unsplash.com/photo-1556217603-efec4f7fd871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNraWluZyUyMHNub3d8ZW58MXx8fHwxNzY2OTYzODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      link: 'https://www.alpedimera.it'
    },
    {
      title: 'Ciaspole & Nordic Walking',
      description: 'Percorsi segnalati per ciaspolate nella neve fresca con viste mozzafiato sulle valli.',
      image: 'https://images.unsplash.com/photo-1648847673583-5c8afff8527a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBoaWtpbmclMjB0cmFpbHxlbnwxfHx8fDE3NjY5NjM4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#'
    },
    {
      title: 'Sleddog & Slittino',
      description: 'Esperienza unica con i cani da slitta o discese adrenaliniche in slittino.',
      image: 'https://images.unsplash.com/photo-1678493388957-3e3738d91f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbiUyMGV4dGVyaW9yfGVufDF8fHx8MTc2Njk0ODY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#'
    }
  ];

  const summerActivities = [
    {
      title: 'Trekking & Escursioni',
      description: 'Centinaia di sentieri escursionistici per tutti i livelli, con rifugi alpini lungo il percorso.',
      image: 'https://images.unsplash.com/photo-1648847673583-5c8afff8527a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBoaWtpbmclMjB0cmFpbHxlbnwxfHx8fDE3NjY5NjM4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#'
    },
    {
      title: 'Mountain Bike',
      description: 'Tracciati MTB per downhill e cross-country con noleggio bici disponibile.',
      image: 'https://images.unsplash.com/photo-1604677657548-4ced0c4f40c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjB0cmFpbHxlbnwxfHx8fDE3NjY5NjM4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#'
    },
    {
      title: 'Rifugi Alpini',
      description: 'Visita i rifugi storici della zona per gustare la cucina alpina tradizionale.',
      image: 'https://images.unsplash.com/photo-1756156263665-8e4aa121b642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2Njk2Mzg0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#'
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
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">Attività & Esperienze</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            Scopri le meraviglie dell'Alpe di Mera in ogni stagione
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
              <span className="font-medium">Inverno</span>
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
              <span className="font-medium">Estate</span>
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
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}