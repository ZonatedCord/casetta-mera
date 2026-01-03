import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitch } from './LanguageSwitch';

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentSection?: string;
}

export function Navbar({ onNavigate, currentSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'activities', label: t('nav.activities') },
    { id: 'availability', label: t('nav.availability') },
    { id: 'contacts', label: t('nav.contacts') },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--forest-roast)]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-2xl text-[var(--eclipse)] hover:text-[var(--matcha-brew)] transition-colors"
          >
            Casetta Mera
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative text-sm transition-colors ${
                  currentSection === link.id
                    ? 'text-[var(--matcha-brew)]'
                    : 'text-[var(--forest-roast)] hover:text-[var(--matcha-brew)]'
                }`}
              >
                {link.label}
                {currentSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-[var(--matcha-brew)]"
                  />
                )}
              </button>
            ))}
            
            {/* Language Switcher - Desktop */}
            <LanguageSwitch />
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitch />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--forest-roast)] hover:text-[var(--matcha-brew)] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--forest-roast)]/10 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-2xl transition-colors ${
                    currentSection === link.id
                      ? 'bg-[var(--almond)]/30 text-[var(--matcha-brew)]'
                      : 'text-[var(--forest-roast)] hover:bg-[var(--almond)]/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}