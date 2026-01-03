import { motion } from 'motion/react';
import { Euro, Calendar, Users, Sparkles } from 'lucide-react';

interface PriceBreakdownProps {
  nights: number;
  guests: number;
  season: 'alta' | 'media' | 'bassa';
  pricePerNight: number;
  cleaningFee?: number;
  extras?: { name: string; price: number }[];
}

export function PriceBreakdown({ nights, guests, season, pricePerNight, cleaningFee = 80, extras = [] }: PriceBreakdownProps) {
  const basePrice = nights * pricePerNight;
  const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = basePrice + cleaningFee + extrasTotal;

  const seasonLabel = {
    alta: 'Alta stagione',
    media: 'Media stagione',
    bassa: 'Bassa stagione'
  };

  const seasonColor = {
    alta: 'text-red-600',
    media: 'text-orange-600',
    bassa: 'text-green-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[var(--almond)]/20 to-[var(--matcha-brew)]/10 rounded-3xl p-8 border border-[var(--forest-roast)]/10"
    >
      <h3 className="text-2xl mb-6 text-[var(--eclipse)]">Riepilogo prezzo</h3>

      {/* Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 text-[var(--forest-roast)]">
          <Calendar className="w-5 h-5 text-[var(--matcha-brew)]" />
          <span>{nights} {nights === 1 ? 'notte' : 'notti'}</span>
        </div>
        
        <div className="flex items-center gap-3 text-[var(--forest-roast)]">
          <Users className="w-5 h-5 text-[var(--matcha-brew)]" />
          <span>{guests} {guests === 1 ? 'ospite' : 'ospiti'}</span>
        </div>

        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[var(--matcha-brew)]" />
          <span className={seasonColor[season]}>{seasonLabel[season]}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pb-6 mb-6 border-b border-[var(--forest-roast)]/10">
        <div className="flex justify-between text-[var(--forest-roast)]">
          <span>€{pricePerNight} × {nights} notti</span>
          <span>€{basePrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-[var(--forest-roast)]">
          <span>Pulizia finale</span>
          <span>€{cleaningFee.toFixed(2)}</span>
        </div>

        {extras.map((extra, index) => (
          <div key={index} className="flex justify-between text-[var(--forest-roast)]">
            <span>{extra.name}</span>
            <span>€{extra.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Euro className="w-6 h-6 text-[var(--matcha-brew)]" />
          <span className="text-xl text-[var(--eclipse)]">Totale</span>
        </div>
        <span className="text-3xl text-[var(--matcha-brew)]" style={{ fontFamily: 'var(--font-serif)' }}>
          €{totalPrice.toFixed(2)}
        </span>
      </div>

      <p className="text-xs text-[var(--forest-roast)]/60 mt-4 text-center">
        I prezzi sono soggetti a disponibilità e possono variare in base al periodo
      </p>
    </motion.div>
  );
}