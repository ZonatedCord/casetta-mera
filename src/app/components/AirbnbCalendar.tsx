import { useEffect, useState } from 'react';
import { format, isSameDay, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  expandBlockedDates,
  expandDateRange,
  fetchAvailability,
  fetchNightlyPrices,
  toIsoDate,
} from '../lib/availability';

interface AirbnbCalendarProps {
  onDateSelect: (checkIn: Date | undefined, checkOut: Date | undefined) => void;
  selectedCheckIn?: Date;
  selectedCheckOut?: Date;
  onDataLoaded?: (blockedDates: Set<string>, priceMap: Map<string, number>) => void;
}

export function AirbnbCalendar({
  onDateSelect,
  selectedCheckIn,
  selectedCheckOut,
  onDataLoaded,
}: AirbnbCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [priceMap, setPriceMap] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const rangeStart = startOfMonth(currentMonth);
    const rangeEnd = endOfMonth(addMonths(currentMonth, 1));

    const loadData = async () => {
      try {
        const [blocks, prices] = await Promise.all([
          fetchAvailability(rangeStart, rangeEnd),
          fetchNightlyPrices(rangeStart, rangeEnd),
        ]);
        const nextBlocked = expandBlockedDates(blocks);
        setBlockedDates(nextBlocked);
        setPriceMap(prices);
        onDataLoaded?.(nextBlocked, prices);
      } catch (error) {
        setBlockedDates(new Set());
        setPriceMap(new Map());
      }
    };

    loadData();
  }, [currentMonth, onDataLoaded]);

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;
    
    // Don't allow selecting booked dates
    if (blockedDates.has(toIsoDate(date))) return;
    
    // If no check-in selected, or if both are selected, start fresh
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      onDateSelect(date, undefined);
    } 
    // If check-in is selected but no check-out
    else if (selectedCheckIn && !selectedCheckOut) {
      // If clicked date is before check-in, make it the new check-in
      if (date < selectedCheckIn) {
        onDateSelect(date, undefined);
      } else {
        const rangeDates = expandDateRange(selectedCheckIn, date);
        const hasBlocked = rangeDates.some((day) => blockedDates.has(day));
        if (hasBlocked) return;
        // Otherwise set it as check-out
        onDateSelect(selectedCheckIn, date);
      }
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => addMonths(prev, -1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const isInRange = (date: Date): boolean => {
    if (!selectedCheckIn) return false;
    if (selectedCheckOut) {
      return date > selectedCheckIn && date < selectedCheckOut;
    }
    if (hoveredDate && hoveredDate > selectedCheckIn) {
      return date > selectedCheckIn && date < hoveredDate;
    }
    return false;
  };

  const isRangeStart = (date: Date): boolean => {
    return selectedCheckIn ? isSameDay(date, selectedCheckIn) : false;
  };

  const isRangeEnd = (date: Date): boolean => {
    return selectedCheckOut ? isSameDay(date, selectedCheckOut) : false;
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-[var(--forest-roast)]/10">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-[var(--almond)]/20 rounded-xl transition-colors"
          aria-label="Mese precedente"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--eclipse)]" />
        </button>
        <h3 className="text-xl text-[var(--eclipse)] capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: it })}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-[var(--almond)]/20 rounded-xl transition-colors"
          aria-label="Mese successivo"
        >
          <ChevronRight className="w-5 h-5 text-[var(--eclipse)]" />
        </button>
      </div>

      {/* Custom Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day) => (
          <div key={day} className="text-center py-2 text-xs text-[var(--forest-roast)]/60 font-medium">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {(() => {
          const monthStart = startOfMonth(currentMonth);
          const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
          const startDate = new Date(monthStart);
          startDate.setDate(startDate.getDate() - (startDate.getDay() || 7) + 1);
          const daysToShow = 42; // 6 weeks
          const dates: Date[] = [];
          
          for (let i = 0; i < daysToShow; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push(date);
          }
          
          return dates.map((date) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
            const price = priceMap.get(toIsoDate(date));
            const isBooked = blockedDates.has(toIsoDate(date));
            const isDisabled = isPast || isBooked || !isCurrentMonth;
            const inRange = isInRange(date);
            const rangeStart = isRangeStart(date);
            const rangeEnd = isRangeEnd(date);
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(undefined)}
                disabled={isDisabled}
                className={`
                  relative p-2 min-h-[70px] flex flex-col items-center justify-center
                  transition-all duration-200 rounded-xl
                  ${!isCurrentMonth ? 'opacity-30' : ''}
                  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  ${rangeStart || rangeEnd ? 'bg-[var(--matcha-brew)] text-white' : ''}
                  ${inRange ? 'bg-[var(--matcha-brew)]/10' : ''}
                  ${!isDisabled && !rangeStart && !rangeEnd && !inRange ? 'hover:bg-[var(--almond)]/20' : ''}
                  ${isBooked ? 'bg-[var(--matcha-brew)]/10 text-[var(--matcha-brew)]' : ''}
                `}
              >
                <span className={`text-sm mb-1 ${rangeStart || rangeEnd ? 'font-semibold' : ''}`}>
                  {date.getDate()}
                </span>
                {isCurrentMonth && !isPast && (
                  <span className="text-xs">
                    {isBooked ? (
                      <span className="inline-flex h-2 w-2 rounded-full bg-[var(--matcha-brew)]" />
                    ) : price ? (
                      <span className={rangeStart || rangeEnd ? 'text-white' : 'text-[var(--forest-roast)]/60'}>
                        €{price}
                      </span>
                    ) : null}
                  </span>
                )}
              </button>
            );
          });
        })()}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-[var(--forest-roast)]/60 pt-6 mt-6 border-t border-[var(--forest-roast)]/10">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--matcha-brew)]" />
          <span>Selezionato</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--matcha-brew)]/10 border border-[var(--matcha-brew)]/20" />
          <span>Nel periodo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[var(--matcha-brew)]" />
          <span>Non disponibile</span>
        </div>
      </div>
    </div>
  );
}
