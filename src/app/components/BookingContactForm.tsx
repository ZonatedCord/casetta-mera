import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Send, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { toIsoDate } from '../lib/availability';

interface BookingContactFormProps {
  bookingDetails?: {
    checkIn?: Date;
    checkOut?: Date;
    nights: number;
    guests: number;
    totalPrice: number;
  };
}

export function BookingContactForm({ bookingDetails }: BookingContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast.error('Devi accettare l\'informativa privacy per continuare');
      return;
    }

    setIsSubmitting(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const notifyPayload = {
      name: fullName,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message?.trim() || 'Nessun messaggio',
      checkIn: bookingDetails?.checkIn ? toIsoDate(bookingDetails.checkIn) : undefined,
      checkOut: bookingDetails?.checkOut ? toIsoDate(bookingDetails.checkOut) : undefined,
      guests: bookingDetails?.guests ?? undefined,
    };

    try {
      const notifyResponse = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifyPayload),
      });

      if (!notifyResponse.ok) {
        const errorBody = await notifyResponse.json().catch(() => null);
        const errorMessage = errorBody?.error ?? 'Errore durante l’invio. Riprova più tardi.';
        toast.error(errorMessage);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error('Notify inquiry request failed', error);
      toast.error('Errore durante l’invio. Riprova più tardi.');
      setIsSubmitting(false);
      return;
    }

    toast.success('Richiesta inviata! Ti contatteremo entro 24 ore.');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      privacyAccepted: false,
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-[var(--forest-roast)]/10"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl mb-2 text-[var(--eclipse)]">I tuoi dati</h3>
        <p className="text-sm text-[var(--forest-roast)]/70">
          Compila il modulo per ricevere un preventivo dettagliato
        </p>
      </div>

      {/* Reassurance */}
      <div className="mb-6 bg-[var(--almond)]/10 rounded-2xl p-4 border border-[var(--forest-roast)]/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--matcha-brew)]/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-[var(--matcha-brew)]" />
          </div>
          <div>
            <p className="text-sm text-[var(--eclipse)] font-medium mb-1">
              Rispondiamo solitamente entro 24 ore
            </p>
            <p className="text-xs text-[var(--forest-roast)]/60">
              Nessun pagamento richiesto ora • Preventivo gratuito e senza impegno
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-[var(--forest-roast)] mb-2 block">
              Nome *
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Mario"
              className="rounded-2xl h-12 border-[var(--forest-roast)]/20 focus:border-[var(--matcha-brew)]"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-[var(--forest-roast)] mb-2 block">
              Cognome *
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Rossi"
              className="rounded-2xl h-12 border-[var(--forest-roast)]/20 focus:border-[var(--matcha-brew)]"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-[var(--forest-roast)] mb-2 block">
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="mario.rossi@email.com"
            className="rounded-2xl h-12 border-[var(--forest-roast)]/20 focus:border-[var(--matcha-brew)]"
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-[var(--forest-roast)] mb-2 block">
            Numero di telefono *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+39 123 456 7890"
            className="rounded-2xl h-12 border-[var(--forest-roast)]/20 focus:border-[var(--matcha-brew)]"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-[var(--forest-roast)] mb-2 block">
            Messaggio (opzionale)
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Raccontaci le tue esigenze o facci domande..."
            className="rounded-2xl min-h-[100px] border-[var(--forest-roast)]/20 focus:border-[var(--matcha-brew)] resize-none"
          />
        </div>

        {/* Privacy checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="privacy"
            checked={formData.privacyAccepted}
            onCheckedChange={(checked) =>
              setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }))
            }
            className="mt-1"
          />
          <label
            htmlFor="privacy"
            className="text-sm text-[var(--forest-roast)]/70 leading-relaxed cursor-pointer"
          >
            Accetto l'<a href="#" className="text-[var(--matcha-brew)] underline hover:text-[var(--eclipse)]">informativa privacy</a> e autorizzo il trattamento dei miei dati personali *
          </label>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isSubmitting || !formData.privacyAccepted}
          className="w-full h-14 rounded-2xl bg-[var(--matcha-brew)] hover:bg-[var(--eclipse)] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Invio in corso...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Richiedi preventivo
            </>
          )}
        </Button>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--forest-roast)]/60 pt-2">
          <Shield className="w-4 h-4" />
          <span>I tuoi dati sono protetti e non verranno condivisi con terze parti</span>
        </div>
      </form>
    </motion.div>
  );
}
