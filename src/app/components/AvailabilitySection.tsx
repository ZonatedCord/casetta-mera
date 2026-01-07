import { useCallback, useMemo, useState } from 'react';
import { addDays } from 'date-fns';
import { motion } from 'motion/react';
import { AirbnbCalendar } from './AirbnbCalendar';
import { GuestSelector } from './GuestSelector';
import { PriceBreakdown } from './PriceBreakdown';
import { BookingContactForm } from './BookingContactForm';
import { Button } from './ui/button';
import { Calendar, Users, ArrowDown } from 'lucide-react';
import { toIsoDate } from '../lib/availability';

export function AvailabilitySection() {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [priceMap, setPriceMap] = useState<Map<string, number>>(new Map());

  const handleCalendarData = useCallback((_: Set<string>, prices: Map<string, number>) => {
    setPriceMap(prices);
  }, []);

  const handleDateSelect = (checkInDate: Date | undefined, checkOutDate: Date | undefined) => {
    setCheckIn(checkInDate);
    setCheckOut(checkOutDate);
    
    // Show price breakdown when both dates are selected
    if (checkInDate && checkOutDate) {
      setShowPriceBreakdown(true);
    } else {
      setShowPriceBreakdown(false);
    }
  };

  // Calculate nights and pricing
  const nights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Simple season logic
  const getFallbackPriceForDate = (date: Date): number => {
    const month = date.getMonth();
    
    // Alta stagione: Dicembre-Marzo (inverno) e Luglio-Agosto (estate)
    if ((month >= 0 && month <= 2) || (month === 11) || (month === 6 || month === 7)) {
      return 180;
    }
    // Bassa stagione: Aprile-Maggio e Settembre-Novembre
    else if (month === 3 || month === 4 || month === 8 || month === 9 || month === 10) {
      return 120;
    }
    // Media stagione
    return 150;
  };

  const getSeason = (): 'alta' | 'media' | 'bassa' => {
    if (!checkIn) return 'media';
    const month = checkIn.getMonth();
    
    if ((month >= 0 && month <= 2) || (month === 11) || (month === 6 || month === 7)) {
      return 'alta';
    } else if (month === 3 || month === 4 || month === 8 || month === 9 || month === 10) {
      return 'bassa';
    }
    return 'media';
  };

  const totalGuests = adults + children;
  const season = getSeason();

  const pricingSummary = useMemo(() => {
    if (!checkIn || !checkOut || nights === 0) {
      return { baseTotal: 0, average: 0, hasMissing: false };
    }

    let total = 0;
    let hasMissing = false;
    let cursor = new Date(checkIn);

    while (cursor < checkOut) {
      const isoDate = toIsoDate(cursor);
      const price = priceMap.get(isoDate);
      if (price == null) {
        hasMissing = true;
        total += getFallbackPriceForDate(cursor);
      } else {
        total += price;
      }
      cursor = addDays(cursor, 1);
    }

    const average = nights > 0 ? Math.round(total / nights) : 0;
    return { baseTotal: total, average, hasMissing };
  }, [checkIn, checkOut, nights, priceMap]);

  const pricePerNight = pricingSummary.average || (checkIn ? getFallbackPriceForDate(checkIn) : 0);
  const basePrice = pricingSummary.baseTotal;
  const cleaningFee = 80;
  const petFee = pets > 0 ? pets * 15 : 0;
  const totalPrice = basePrice + cleaningFee + petFee;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[var(--almond)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">Disponibilità & Prezzi</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            Seleziona le date e il numero di ospiti per calcolare il preventivo
          </p>
        </motion.div>

        {/* Selected Dates Summary */}
        {(checkIn || checkOut || totalGuests > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl p-6 shadow-lg border border-[var(--forest-roast)]/5"
          >
            <div className="flex flex-wrap gap-6 items-center justify-center text-sm">
              {checkIn && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--matcha-brew)]" />
                  <span className="text-[var(--forest-roast)]/60">Check-in:</span>
                  <span className="text-[var(--eclipse)] font-medium">
                    {checkIn.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              )}
              {checkOut && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--matcha-brew)]" />
                  <span className="text-[var(--forest-roast)]/60">Check-out:</span>
                  <span className="text-[var(--eclipse)] font-medium">
                    {checkOut.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              )}
              {nights > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--forest-roast)]/60">Notti:</span>
                  <span className="text-[var(--eclipse)] font-medium">{nights}</span>
                </div>
              )}
              {totalGuests > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--matcha-brew)]" />
                  <span className="text-[var(--eclipse)] font-medium">
                    {totalGuests} {totalGuests === 1 ? 'ospite' : 'ospiti'}
                    {pets > 0 && `, ${pets} ${pets === 1 ? 'animale' : 'animali'}`}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Calendar - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <AirbnbCalendar
              onDateSelect={handleDateSelect}
              selectedCheckIn={checkIn}
              selectedCheckOut={checkOut}
              onDataLoaded={handleCalendarData}
            />
            
            {/* Info card below calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-[var(--almond)]/10 rounded-2xl p-6 border border-[var(--forest-roast)]/5"
            >
              <h4 className="text-lg mb-3 text-[var(--eclipse)]">Note sulla prenotazione</h4>
              <ul className="space-y-2 text-sm text-[var(--forest-roast)]/70">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--matcha-brew)] mt-2 flex-shrink-0" />
                  <span>Soggiorno minimo: 2 notti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--matcha-brew)] mt-2 flex-shrink-0" />
                  <span>Check-in: dalle 15:00 • Check-out: entro le 11:00</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--matcha-brew)] mt-2 flex-shrink-0" />
                  <span>Cancellazione gratuita fino a 7 giorni prima dell'arrivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--matcha-brew)] mt-2 flex-shrink-0" />
                  <span>I prezzi variano in base alla stagione</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Guest Selector and Price Breakdown - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <GuestSelector
              adults={adults}
              children={children}
              pets={pets}
              onAdultsChange={setAdults}
              onChildrenChange={setChildren}
              onPetsChange={setPets}
            />

            {/* Price Breakdown - Only show when dates are selected */}
            {showPriceBreakdown && nights > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PriceBreakdown
                  nights={nights}
                  guests={totalGuests}
                  season={season}
                  pricePerNight={pricePerNight}
                  cleaningFee={cleaningFee}
                  extras={pets > 0 ? [{ name: `Animali domestici (${pets})`, price: petFee }] : []}
                />
                {pricingSummary.hasMissing ? (
                  <p className="mt-3 text-xs text-[var(--forest-roast)]/60">
                    Prezzo da definire per alcune notti: stiamo usando un valore indicativo.
                  </p>
                ) : null}
                
                {/* Proceed to contact form button */}
                {!showContactForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <Button
                      onClick={() => setShowContactForm(true)}
                      className="w-full h-14 rounded-2xl bg-[var(--matcha-brew)] hover:bg-[var(--eclipse)] text-white transition-colors"
                    >
                      Procedi con la richiesta
                      <ArrowDown className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Empty state when no dates selected */}
            {!showPriceBreakdown && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-[var(--forest-roast)]/10">
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-[var(--matcha-brew)]/40 mx-auto mb-4" />
                  <p className="text-[var(--forest-roast)]/60 mb-2">
                    Seleziona le date sul calendario
                  </p>
                  <p className="text-sm text-[var(--forest-roast)]/40">
                    I prezzi vengono visualizzati direttamente sul calendario
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Contact Form - Full width below when user proceeds */}
        {showContactForm && showPriceBreakdown && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--almond)]/20 rounded-full text-sm text-[var(--eclipse)] mb-4">
                <span className="w-6 h-6 rounded-full bg-[var(--matcha-brew)] text-white flex items-center justify-center text-xs">2</span>
                Quasi fatto
              </div>
              <h3 className="text-3xl text-[var(--eclipse)]">Completa la richiesta</h3>
            </div>
            
            <BookingContactForm
              bookingDetails={{
                checkIn,
                checkOut,
                nights,
                guests: totalGuests,
                totalPrice,
              }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
