import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm border border-[var(--forest-roast)]/10">
      <button
        onClick={() => setLanguage('it')}
        className={`relative px-3 py-1.5 rounded-full transition-all ${
          language === 'it'
            ? 'text-[var(--eclipse)]'
            : 'text-[var(--forest-roast)]/50 hover:text-[var(--forest-roast)]'
        }`}
      >
        {language === 'it' && (
          <motion.div
            layoutId="languageIndicator"
            className="absolute inset-0 bg-[var(--almond)]/30 rounded-full"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative flex items-center gap-1.5 text-sm">
          <span
            className={`inline-flex items-center justify-center overflow-hidden rounded-sm border ${
              language === 'it'
                ? 'border-[var(--matcha-brew)]'
                : 'border-[var(--forest-roast)]/60'
            }`}
          >
            <img
              src="/flags/it.svg"
              alt=""
              className="block h-3.5 w-5"
              style={{ filter: language === 'it' ? 'none' : 'grayscale(1)' }}
            />
          </span>
          <span className="sr-only">Italiano</span>
        </span>
      </button>

      <button
        onClick={() => setLanguage('en')}
        className={`relative px-3 py-1.5 rounded-full transition-all ${
          language === 'en'
            ? 'text-[var(--eclipse)]'
            : 'text-[var(--forest-roast)]/50 hover:text-[var(--forest-roast)]'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="languageIndicator"
            className="absolute inset-0 bg-[var(--almond)]/30 rounded-full"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative flex items-center gap-1.5 text-sm">
          <span
            className={`inline-flex items-center justify-center overflow-hidden rounded-sm border ${
              language === 'en'
                ? 'border-[var(--matcha-brew)]'
                : 'border-[var(--forest-roast)]/60'
            }`}
          >
            <img
              src="/flags/en.svg"
              alt=""
              className="block h-3.5 w-5"
              style={{ filter: language === 'en' ? 'none' : 'grayscale(1)' }}
            />
          </span>
          <span className="sr-only">English</span>
        </span>
      </button>
    </div>
  );
}
