import { motion } from 'motion/react';
import { Calendar, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomBarProps {
  onNavigateToAvailability: () => void;
  onOpenQuoteForm: () => void;
}

export function MobileBottomBar({ onNavigateToAvailability, onOpenQuoteForm }: MobileBottomBarProps) {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[var(--forest-roast)]/10 px-4 py-3 safe-area-inset-bottom"
    >
      <div className="flex gap-3">
        <Button
          onClick={onNavigateToAvailability}
          className="flex-1 rounded-2xl bg-[var(--matcha-brew)] hover:bg-[var(--eclipse)] text-white h-12"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {t('mobileBar.checkAvailability')}
        </Button>
        <Button
          onClick={onOpenQuoteForm}
          variant="outline"
          className="flex-1 rounded-2xl border-[var(--matcha-brew)] text-[var(--matcha-brew)] hover:bg-[var(--matcha-brew)]/10 h-12"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          {t('mobileBar.contact')}
        </Button>
      </div>
    </motion.div>
  );
}