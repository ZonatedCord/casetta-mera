import { motion } from 'motion/react';
import { TestimonialCard } from './TestimonialCard';
import { useLanguage } from '../context/LanguageContext';

export function TestimonialsSection() {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: 'Marco & Giulia',
      location: 'Milano, IT',
      rating: 5,
      comment: 'Una settimana fantastica! La casa è ancora più bella delle foto, pulitissima e con tutti i comfort. I bambini si sono divertiti moltissimo e noi abbiamo goduto della pace e della vista incredibile. Torneremo sicuramente!',
      date: 'Dicembre 2024'
    },
    {
      name: 'Sophie Laurent',
      location: 'Lione, FR',
      rating: 5,
      comment: 'Accueil chaleureux et cadre idyllique! La proximité des pistes est un vrai plus. La maison est parfaitement équipée et très confortable. Nous avons adoré les soirées au coin du feu.',
      date: 'Gennaio 2025'
    },
    {
      name: 'Andrea Rossi',
      location: 'Torino, IT',
      rating: 5,
      comment: 'Location perfetta per chi ama la montagna. Siamo venuti in estate per il trekking e siamo rimasti incantati dai sentieri e dalla natura. La casetta è un gioiello, curata nei minimi dettagli. Consigliatissima!',
      date: 'Agosto 2024'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[var(--almond)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">{t('testimonials.title')}</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}