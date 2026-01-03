import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Calendar, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onNavigateToAvailability?: () => void;
  onOpenQuoteForm?: () => void;
}

export function Hero({ onNavigateToAvailability, onOpenQuoteForm }: HeroProps) {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwYWxwcyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjY5NjM4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[var(--almond)]/30 to-white/50" />
        
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 rounded-full text-sm bg-[var(--eclipse)]/5 backdrop-blur-sm text-[var(--eclipse)]"
          >
            {t('hero.eyebrow')}
          </motion.div>

          {/* Main Heading */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl max-w-5xl mx-auto leading-tight text-[var(--eclipse)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('hero.title')}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-[var(--forest-roast)]">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              onClick={onNavigateToAvailability}
              className="rounded-2xl px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all bg-[var(--matcha-brew)] text-white hover:bg-[var(--eclipse)]"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t('hero.checkAvailability')}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={onOpenQuoteForm}
              className="rounded-2xl px-8 py-6 text-lg border-2 border-[var(--forest-roast)] text-[var(--forest-roast)] hover:bg-[var(--forest-roast)] hover:text-white transition-all"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {t('hero.contactUs')}
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-8 justify-center items-center pt-12 text-[var(--forest-roast)]/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--matcha-brew)]" />
              <span>Cancellazione gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--matcha-brew)]" />
              <span>Vista panoramica</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--matcha-brew)]" />
              <span>Vicino agli impianti</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[var(--eclipse)]/40 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--eclipse)]/60"
          />
        </div>
      </motion.div>
    </section>
  );
}