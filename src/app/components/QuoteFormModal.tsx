import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calendar, Users, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    notes: ''
  });

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[var(--eclipse)]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-[var(--forest-roast)]/10 px-8 py-6 flex items-center justify-between rounded-t-3xl">
                  <div>
                    <h2 className="text-3xl text-[var(--eclipse)]">Richiedi un Preventivo</h2>
                    <p className="text-[var(--forest-roast)]/70 mt-1">
                      Ti risponderemo entro 24 ore
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-[var(--almond)]/20 hover:bg-[var(--almond)]/40 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-[var(--eclipse)]" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                        Nome e Cognome *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Mario Rossi"
                        className="rounded-2xl border-[var(--forest-roast)]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="mario.rossi@email.com"
                        className="rounded-2xl border-[var(--forest-roast)]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                      Telefono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+39 333 123 4567"
                      className="rounded-2xl border-[var(--forest-roast)]/20"
                    />
                  </div>

                  {/* Stay Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                        Check-in
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--matcha-brew)] pointer-events-none" />
                        <Input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          className="rounded-2xl border-[var(--forest-roast)]/20 pl-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                        Check-out
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--matcha-brew)] pointer-events-none" />
                        <Input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          className="rounded-2xl border-[var(--forest-roast)]/20 pl-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                        Ospiti
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--matcha-brew)] pointer-events-none" />
                        <Input
                          type="number"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          min="1"
                          max="8"
                          className="rounded-2xl border-[var(--forest-roast)]/20 pl-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm mb-2 text-[var(--forest-roast)]">
                      Note aggiuntive
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[var(--matcha-brew)] pointer-events-none" />
                      <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Raccontaci qualcosa in più sul tuo soggiorno..."
                        rows={4}
                        className="rounded-2xl border-[var(--forest-roast)]/20 pl-12 pt-3"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-[var(--matcha-brew)] hover:bg-[var(--eclipse)] text-white"
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
              </>
            ) : (
              // Success State
              <div className="p-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="text-3xl mb-4 text-[var(--eclipse)]">Richiesta Inviata!</h3>
                <p className="text-[var(--forest-roast)]/70 text-lg leading-relaxed max-w-md mx-auto">
                  Grazie per il tuo interesse. Ti contatteremo entro 24 ore con un preventivo personalizzato.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
