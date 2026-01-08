import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calendar, Users, MessageSquare, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type IconFieldProps = {
  icon: typeof Calendar;
  align?: 'center' | 'top';
  children: ReactNode;
};

function IconField({ icon: Icon, align = 'center', children }: IconFieldProps) {
  const iconClassName =
    align === 'top'
      ? 'absolute left-3 top-3 h-5 w-5 text-[var(--matcha-brew)] pointer-events-none'
      : 'absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--matcha-brew)] pointer-events-none';

  return (
    <div className="relative w-full min-w-0">
      <Icon className={iconClassName} />
      {children}
    </div>
  );
}

export function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    notes: ''
  });
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setDragOffset(0);
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '2',
        notes: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClassName =
    "w-full min-w-0 h-12 rounded-xl border-[var(--forest-roast)]/20 bg-[var(--input-background)] px-4 text-sm text-[var(--eclipse)] placeholder:text-[var(--forest-roast)]/50 focus-visible:border-[var(--matcha-brew)] appearance-none";
  const inputIconClassName = `${inputClassName} pl-11 pr-4`;
  const textAreaClassName =
    "w-full rounded-xl border-[var(--forest-roast)]/20 bg-[var(--input-background)] px-4 py-3 text-sm text-[var(--eclipse)] placeholder:text-[var(--forest-roast)]/50 focus-visible:border-[var(--matcha-brew)] min-h-[120px]";

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    dragStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const currentY = event.touches[0].clientY;
    const delta = currentY - dragStartY.current;
    if (delta <= 0) return;

    const scrollTop = sheetRef.current?.scrollTop ?? 0;
    if (scrollTop > 0) return;

    setIsDragging(true);
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    if (dragStartY.current === null) return;
    const shouldClose = dragOffset > 110;
    dragStartY.current = null;
    setIsDragging(false);

    if (shouldClose) {
      setDragOffset(0);
      onClose();
      return;
    }

    setDragOffset(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40"
        >
          <div className="fixed inset-x-0 bottom-0 sm:static sm:flex sm:min-h-full sm:items-center sm:justify-center">
            <motion.div
              ref={sheetRef}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: dragOffset ? `translateY(${dragOffset}px)` : undefined,
                transition: isDragging ? 'none' : 'transform 200ms ease',
              }}
              className="bg-white w-full max-w-md mx-auto max-h-[85dvh] sm:max-h-[85vh] overflow-y-auto overflow-x-hidden touch-pan-y rounded-t-3xl sm:rounded-3xl shadow-2xl"
            >
              {!isSubmitted ? (
                <div className="flex min-h-0 flex-col">
                  {/* Header */}
                  <div className="bg-white border-b border-[var(--forest-roast)]/10 px-5 py-4 sm:px-6 sm:py-6 space-y-3">
                    <div className="flex justify-center">
                      <div className="h-1 w-10 rounded-full bg-[var(--forest-roast)]/20" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl text-[var(--eclipse)]">
                          Richiedi un Preventivo
                        </h2>
                        <p className="text-sm sm:text-base text-[var(--forest-roast)]/70">
                          Ti risponderemo entro 24 ore
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-transparent hover:bg-[var(--almond)]/30 flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5 text-[var(--eclipse)]" />
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-5 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6 space-y-4">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                          Nome e Cognome <span className="text-[var(--matcha-brew)]">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Mario Rossi"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                          Email <span className="text-[var(--matcha-brew)]">*</span>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="mario.rossi@email.com"
                          className={inputClassName}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                        Telefono <span className="text-[var(--forest-roast)]/60">(opzionale)</span>
                      </label>
                      <IconField icon={Phone}>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+39 333 123 4567"
                          className={inputIconClassName}
                        />
                      </IconField>
                    </div>

                    {/* Stay Details */}
                    <div className="grid w-full min-w-0 grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="min-w-0">
                        <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                          Check-in
                        </label>
                        <IconField icon={Calendar}>
                          <Input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            placeholder="gg/mm/aaaa"
                            className={inputIconClassName}
                          />
                        </IconField>
                      </div>
                      <div className="min-w-0">
                        <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                          Check-out
                        </label>
                        <IconField icon={Calendar}>
                          <Input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            placeholder="gg/mm/aaaa"
                            className={inputIconClassName}
                          />
                        </IconField>
                      </div>
                      <div className="min-w-0">
                        <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                          Ospiti
                        </label>
                        <IconField icon={Users}>
                          <Input
                            type="number"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            min="1"
                            max="8"
                            className={inputIconClassName}
                          />
                        </IconField>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                        Note aggiuntive
                      </label>
                      <IconField icon={MessageSquare} align="top">
                        <Textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Raccontaci qualcosa in più sul tuo soggiorno..."
                          rows={4}
                          className={`${textAreaClassName} pl-11`}
                        />
                      </IconField>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-[var(--matcha-brew)] hover:bg-[var(--eclipse)] text-white"
                    >
                      Invia richiesta
                    </Button>

                    <p className="text-xs text-[var(--forest-roast)]/60 text-center">
                      Inviando questo modulo accetti la nostra{' '}
                      <a href="#" className="text-[var(--matcha-brew)] hover:underline">
                        privacy policy
                      </a>
                    </p>
                  </form>
                </div>
              ) : (
                // Success State
                <div className="px-6 py-12 sm:p-16 text-center flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl mb-4 text-[var(--eclipse)]">Richiesta Inviata!</h3>
                  <p className="text-[var(--forest-roast)]/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                    Grazie per il tuo interesse. Ti contatteremo entro 24 ore con un preventivo personalizzato.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
