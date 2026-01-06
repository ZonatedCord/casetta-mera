import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[var(--eclipse)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-2xl mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('footer.brand')}
            </h3>
            <p className="text-white/70 leading-relaxed mb-4">
              {t('footer.brandDescription')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/393331234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="mb-4">{t('footer.contacts')}</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@casettamera.it"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@casettamera.it</span>
              </a>
              <a
                href="tel:+393331234567"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+39 333 123 4567</span>
              </a>
              <a
                href="https://wa.me/393331234567"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('footer.whatsapp')}</span>
              </a>
            </div>
          </div>

          {/* Indirizzo */}
          <div>
            <h4 className="mb-4">{t('footer.location')}</h4>
            <div className="flex items-start gap-3 text-white/70">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
              <address className="not-italic leading-relaxed">
                {t('footer.address.line1')}<br />
                {t('footer.address.line2')}<br />
                {t('footer.address.line3')}
              </address>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4">{t('footer.quickLinks')}</h4>
            <div className="space-y-2">
              <a href="#" className="block text-white/70 hover:text-white transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="block text-white/70 hover:text-white transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="block text-white/70 hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60 text-sm">
          <p>{t('footer.legalText')}</p>
        </div>
      </div>
    </footer>
  );
}
