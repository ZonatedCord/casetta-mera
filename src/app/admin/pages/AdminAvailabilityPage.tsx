import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { it } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  expandBlockedDates,
  expandDateRange,
  fetchAvailability,
  fetchNightlyPrices,
  toIsoDate,
  type AvailabilityBlock,
} from '../../lib/availability';

export function AdminAvailabilityPage() {
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()));
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [priceMap, setPriceMap] = useState<Map<string, number>>(new Map());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [priceInput, setPriceInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const monthLabel = useMemo(
    () => format(currentMonth, 'LLLL yyyy', { locale: it }),
    [currentMonth]
  );

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    try {
      const [blocksData, prices] = await Promise.all([
        fetchAvailability(monthStart, monthEnd),
        fetchNightlyPrices(monthStart, monthEnd),
      ]);
      setBlocks(blocksData);
      setPriceMap(prices);
    } catch (error) {
      setErrorMessage('Errore nel caricamento delle disponibilita.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentMonth]);

  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    const weekRows: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weekRows.push(days.slice(i, i + 7));
    }
    return weekRows;
  }, [currentMonth]);

  const blockedDates = useMemo(() => expandBlockedDates(blocks), [blocks]);

  const isBlocked = (day: Date) => blockedDates.has(toIsoDate(day));

  const handleDayClick = (day: Date) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(day);
      setRangeEnd(null);
      return;
    }

    const start = rangeStart;
    const end = day;
    if (end < start) {
      setRangeStart(end);
      setRangeEnd(start);
    } else {
      setRangeEnd(end);
    }
  };

  const handleSaveBlock = async () => {
    if (!rangeStart) return;
    const start = rangeStart;
    const end = rangeEnd ?? rangeStart;

    setIsSaving(true);
    const { error } = await supabase.from('availability_blocks').insert({
      start_date: toIsoDate(start),
      end_date: toIsoDate(end),
    });

    if (error) {
      setErrorMessage('Errore nel salvataggio del blocco.');
      setIsSaving(false);
      return;
    }

    setRangeStart(null);
    setRangeEnd(null);
    setIsSaving(false);
    fetchData();
  };

  const handleDeleteBlock = async (blockId: string) => {
    setIsSaving(true);
    const { error } = await supabase.from('availability_blocks').delete().eq('id', blockId);

    if (error) {
      setErrorMessage('Errore nello sblocco del periodo.');
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    fetchData();
  };

  const handleSavePrice = async () => {
    if (!rangeStart) return;
    const priceValue = Number(priceInput);
    if (!priceValue || priceValue <= 0) {
      setErrorMessage('Inserisci un prezzo valido.');
      return;
    }

    const start = rangeStart;
    const end = rangeEnd ?? rangeStart;
    const dates = expandDateRange(start, end);

    setIsSaving(true);
    const { error } = await supabase.from('nightly_prices').upsert(
      dates.map((date) => ({
        date,
        price_eur: priceValue,
      })),
      { onConflict: 'date' }
    );

    if (error) {
      setErrorMessage('Errore nel salvataggio dei prezzi.');
      setIsSaving(false);
      return;
    }

    setPriceInput('');
    setIsSaving(false);
    fetchData();
  };

  const handleRemovePrice = async () => {
    if (!rangeStart) return;
    const start = rangeStart;
    const end = rangeEnd ?? rangeStart;
    const dates = expandDateRange(start, end);

    setIsSaving(true);
    const { error } = await supabase.from('nightly_prices').delete().in('date', dates);

    if (error) {
      setErrorMessage('Errore nella rimozione dei prezzi.');
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Calendario</p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--eclipse)] capitalize">{monthLabel}</h3>
          <p className="mt-2 text-sm text-[var(--forest-roast)]/70">
            Clicca un giorno per selezionare un blocco singolo o un range.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentMonth(startOfMonth(addMonths(currentMonth, -1)))}
            className="rounded-full border border-[var(--forest-roast)]/20 px-4 py-2 text-sm font-medium text-[var(--forest-roast)]/80 transition hover:border-[var(--forest-roast)]/40"
          >
            Mese precedente
          </button>
          <button
            type="button"
            onClick={() => setCurrentMonth(startOfMonth(addMonths(currentMonth, 1)))}
            className="rounded-full border border-[var(--forest-roast)]/20 px-4 py-2 text-sm font-medium text-[var(--forest-roast)]/80 transition hover:border-[var(--forest-roast)]/40"
          >
            Mese successivo
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-2">
        <div className="grid grid-cols-7 gap-2 text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((label) => (
            <div key={label} className="text-center">
              {label}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {weeks.map((week, index) => (
            <div key={index} className="grid grid-cols-7 gap-2">
              {week.map((day) => {
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const blocked = isBlocked(day);
                const dayPrice = priceMap.get(toIsoDate(day));
                const isSelected =
                  rangeStart &&
                  rangeEnd &&
                  isWithinInterval(day, { start: rangeStart, end: rangeEnd });
                const isStart = rangeStart && toIsoDate(day) === toIsoDate(rangeStart);

                return (
                  <button
                    type="button"
                    key={day.toISOString()}
                    onClick={() => handleDayClick(day)}
                    className={`flex h-14 flex-col items-center justify-center rounded-2xl text-sm font-medium transition ${
                      !isCurrentMonth
                        ? 'text-[var(--forest-roast)]/30'
                        : blocked
                        ? 'bg-[var(--forest-roast)] text-white'
                        : 'bg-[var(--almond)]/15 text-[var(--forest-roast)]/90 hover:bg-[var(--almond)]/25'
                    } ${isSelected || isStart ? 'ring-2 ring-[var(--matcha-brew)] ring-offset-2 ring-offset-white' : ''}`}
                  >
                    {day.getDate()}
                    {dayPrice ? (
                      <span className={`text-[11px] ${blocked ? 'text-white/70' : 'text-[var(--forest-roast)]/60'}`}>
                        €{dayPrice}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 px-4 py-4">
        <div className="text-sm text-[var(--forest-roast)]/80">
          {rangeStart ? (
            <span>
              Selezione: {toIsoDate(rangeStart)}{rangeEnd ? ` -> ${toIsoDate(rangeEnd)}` : ''}
            </span>
          ) : (
            <span>Nessun range selezionato.</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleSaveBlock}
          disabled={!rangeStart}
          className="rounded-full bg-[var(--matcha-brew)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--eclipse)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Salvataggio...' : 'Salva blocco'}
        </button>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Prezzo EUR"
            value={priceInput}
            onChange={(event) => setPriceInput(event.target.value)}
            className="w-32 rounded-full border border-[var(--forest-roast)]/20 bg-white px-3 py-2 text-sm text-[var(--forest-roast)]/80"
          />
          <button
            type="button"
            onClick={handleSavePrice}
            disabled={!rangeStart || isSaving}
            className="rounded-full border border-[var(--matcha-brew)] px-4 py-2 text-sm font-semibold text-[var(--matcha-brew)] transition hover:bg-[var(--almond)]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Salva prezzo
          </button>
          <button
            type="button"
            onClick={handleRemovePrice}
            disabled={!rangeStart || isSaving}
            className="rounded-full border border-[var(--forest-roast)]/20 px-4 py-2 text-sm font-medium text-[var(--forest-roast)]/80 transition hover:border-[var(--forest-roast)]/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Rimuovi prezzo
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setRangeStart(null);
            setRangeEnd(null);
          }}
          className="rounded-full border border-[var(--forest-roast)]/20 px-4 py-2 text-sm font-medium text-[var(--forest-roast)]/80 transition hover:border-[var(--forest-roast)]/40"
        >
          Reset selezione
        </button>
      </div>

      {isLoading ? <p className="text-sm text-[var(--forest-roast)]/60">Caricamento blocchi...</p> : null}

      {blocks.length > 0 ? (
        <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Blocchi salvati</p>
          <div className="mt-3 space-y-2">
            {blocks.map((block) => (
              <div key={block.id} className="flex items-center justify-between rounded-xl border border-[var(--forest-roast)]/10 px-3 py-2 text-sm text-[var(--forest-roast)]/80">
                <span>
                  {block.start_date} {' -> '} {block.end_date}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteBlock(block.id)}
                  className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-1 text-xs font-medium text-[var(--forest-roast)]/80 transition hover:border-[var(--forest-roast)]/40"
                >
                  Sblocca
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
