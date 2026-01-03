import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { format, isSameDay, eachDayOfInterval, addMonths, startOfMonth } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AirbnbCalendarProps {
  onDateSelect: (checkIn: Date | undefined, checkOut: Date | undefined) => void;
  selectedCheckIn?: Date;
  selectedCheckOut?: Date;
}

// Price data by date (in a real app, this would come from an API)
const getPriceForDate = (date: Date): number => {
  const month = date.getMonth();
  const day = date.getDate();
  
  // Mock booked dates
  const bookedDates = [
    new Date(2025, 0, 5),
    new Date(2025, 0, 6),
    new Date(2025, 0, 15),
    new Date(2025, 0, 16),
    new Date(2025, 0, 17),
    new Date(2025, 1, 10),
    new Date(2025, 1, 11),
  ];
  
  const isBooked = bookedDates.some(d => isSameDay(d, date));
  if (isBooked) return 0; // 0 means unavailable
  
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

const isDateBooked = (date: Date): boolean => {
  const bookedDates = [
    new Date(2025, 0, 5),
    new Date(2025, 0, 6),
    new Date(2025, 0, 15),
    new Date(2025, 0, 16),
    new Date(2025, 0, 17),
    new Date(2025, 1, 10),
    new Date(2025, 1, 11),
  ];
  
  return bookedDates.some(d => isSameDay(d, date));
};

export function AirbnbCalendar({ onDateSelect, selectedCheckIn, selectedCheckOut }: AirbnbCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;
    
    // Don't allow selecting booked dates
    if (isDateBooked(date)) return;
    
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
          const endDate = new Date(monthEnd);
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
            const price = getPriceForDate(date);
            const isBooked = price === 0;
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
                  ${isBooked ? 'bg-[var(--forest-roast)]/5' : ''}
                `}
              >
                <span className={`text-sm mb-1 ${rangeStart || rangeEnd ? 'font-semibold' : ''}`}>
                  {date.getDate()}
                </span>
                {isCurrentMonth && !isPast && (
                  <span className={`text-xs ${rangeStart || rangeEnd ? 'text-white' : isBooked ? 'text-[var(--forest-roast)]/40 line-through' : 'text-[var(--forest-roast)]/60'}`}>
                    {isBooked ? '—' : `€${price}`}
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
          <div className="w-4 h-4 rounded bg-[var(--forest-roast)]/5" />
          <span>Non disponibile</span>
        </div>
      </div>
    </div>
  );
}
