import { motion } from 'motion/react';
import { PhotoGallery } from './PhotoGallery';
import { useLanguage } from '../context/LanguageContext';

export function GallerySection() {
  const { t } = useLanguage();
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1756156263665-8e4aa121b642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2Njk2Mzg0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.exterior')
    },
    {
      url: 'https://images.unsplash.com/photo-1585803114088-cd027272106a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FiaW4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjY5NTQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.livingRoom')
    },
    {
      url: 'https://images.unsplash.com/photo-1740446569491-252a9ba2c6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYWJpbiUyMGJlZHJvb218ZW58MXx8fHwxNzY2OTU0MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.bedroom')
    },
    {
      url: 'https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwYWxwcyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjY5NjM4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.panorama')
    },
    {
      url: 'https://images.unsplash.com/photo-1678493388957-3e3738d91f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbiUyMGV4dGVyaW9yfGVufDF8fHx8MTc2Njk0ODY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.terrace')
    },
    {
      url: 'https://images.unsplash.com/photo-1556217603-efec4f7fd871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNraWluZyUyMHNub3d8ZW58MXx8fHwxNzY2OTYzODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.ski')
    },
    {
      url: 'https://images.unsplash.com/photo-1648847673583-5c8afff8527a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBoaWtpbmclMjB0cmFpbHxlbnwxfHx8fDE3NjY5NjM4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.hiking')
    },
    {
      url: 'https://images.unsplash.com/photo-1604677657548-4ced0c4f40c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjB0cmFpbHxlbnwxfHx8fDE3NjY5NjM4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: t('gallery.captions.bike')
    }
  ];

  return (
    <section className="py-24 bg-[var(--almond)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">{t('gallery.title')}</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        <PhotoGallery photos={photos} />
      </div>
    </section>
  );
}
