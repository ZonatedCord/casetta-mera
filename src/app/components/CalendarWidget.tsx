import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon, Users, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface CalendarWidgetProps {
  onSubmit?: (data: { checkIn?: Date; checkOut?: Date; guests: number }) => void;
}

export function CalendarWidget({ onSubmit }: CalendarWidgetProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  // Mock booked dates for demonstration
  const bookedDates = [
    new Date(2025, 0, 5),
    new Date(2025, 0, 6),
    new Date(2025, 0, 15),
    new Date(2025, 0, 16),
    new Date(2025, 0, 17),
  ];

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ checkIn, checkOut, guests });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-[var(--forest-roast)]/10">
      <h3 className="text-2xl mb-6 text-[var(--eclipse)]">Verifica disponibilità</h3>

      <div className="space-y-6">
        {/* Date Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Check-in */}
          <div>
            <label className="block text-sm mb-2 text-[var(--forest-roast)]">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left rounded-2xl h-12 border-[var(--forest-roast)]/20 hover:border-[var(--matcha-brew)]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[var(--matcha-brew)]" />
                  {checkIn ? format(checkIn, 'PPP', { locale: it }) : 'Seleziona data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) =>
                    date < new Date() || bookedDates.some((d) => d.toDateString() === date.toDateString())
                  }
                  initialFocus
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out */}
          <div>
            <label className="block text-sm mb-2 text-[var(--forest-roast)]">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left rounded-2xl h-12 border-[var(--forest-roast)]/20 hover:border-[var(--matcha-brew)]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[var(--matcha-brew)]" />
                  {checkOut ? format(checkOut, 'PPP', { locale: it }) : 'Seleziona data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) =>
                    date < (checkIn || new Date()) ||
                    bookedDates.some((d) => d.toDateString() === date.toDateString())
                  }
                  initialFocus
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm mb-2 text-[var(--forest-roast)]">Ospiti</label>
          <div className="flex items-center justify-between p-4 rounded-2xl border border-[var(--forest-roast)]/20">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[var(--matcha-brew)]" />
              <span className="text-[var(--eclipse)]">{guests} {guests === 1 ? 'ospite' : 'ospiti'}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 rounded-lg bg-[var(--almond)]/20 hover:bg-[var(--almond)]/40 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4 text-[var(--eclipse)]" />
              </button>
              <button
                onClick={() => setGuests(Math.min(8, guests + 1))}
                className="w-8 h-8 rounded-lg bg-[var(--almond)]/20 hover:bg-[var(--almond)]/40 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4 text-[var(--eclipse)]" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-12 rounded-2xl bg-[var(--matcha-brew)] hover:bg-[var(--eclipse)] text-white transition-colors"
        >
          Verifica disponibilità
        </Button>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-[var(--forest-roast)]/60 pt-4 border-t border-[var(--forest-roast)]/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[var(--matcha-brew)]" />
            <span>Disponibile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[var(--forest-roast)]/20" />
            <span>Prenotato</span>
          </div>
        </div>
      </div>
    </div>
  );
}
