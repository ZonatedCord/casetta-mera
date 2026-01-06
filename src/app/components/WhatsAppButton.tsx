import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // WhatsApp number (format: country code + number without +)
  const whatsappNumber = '393123456789'; // Replace with actual number
  const whatsappMessage = encodeURIComponent('Ciao! Vorrei informazioni su Casetta Mera.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Desktop version - bottom right */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50 bg-transparent rounded-full shadow-none overflow-visible">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 mb-2 bg-white rounded-2xl shadow-2xl p-4 border border-[var(--forest-roast)]/10 min-w-[280px]"
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-3 right-3 p-1 hover:bg-[var(--almond)]/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-[var(--forest-roast)]" />
              </button>
              
              <div className="mb-4">
                <h3 className="text-lg text-[var(--eclipse)] mb-1">Contattaci su WhatsApp</h3>
                <p className="text-sm text-[var(--forest-roast)]/70">
                  Rispondiamo entro 24 ore
                </p>
              </div>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Apri chat</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl flex items-center justify-center transition-colors border-0 outline-none ring-0 focus:outline-none focus:ring-0 overflow-hidden bg-clip-padding isolate will-change-transform"
          aria-label="Contattaci su WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Mobile version - integrated with bottom navigation */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl flex items-center justify-center transition-colors border-0 outline-none ring-0 focus:outline-none focus:ring-0 overflow-hidden bg-clip-padding isolate will-change-transform before:content-none after:content-none hover:scale-[1.03] active:scale-[0.98] transition-transform"
        aria-label="Contattaci su WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}
