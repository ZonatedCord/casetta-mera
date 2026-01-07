import { addDays, format, isAfter, parseISO } from 'date-fns';
import { supabase } from './supabaseClient';

export type AvailabilityBlock = {
  id: string;
  start_date: string;
  end_date: string;
  note?: string | null;
};

export type NightlyPrice = {
  date: string;
  price_eur: number;
};

export const toIsoDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const expandDateRange = (start: Date, end: Date) => {
  const dates: string[] = [];
  let cursor = start;

  while (!isAfter(cursor, end)) {
    dates.push(toIsoDate(cursor));
    cursor = addDays(cursor, 1);
  }

  return dates;
};

export const expandBlockedDates = (blocks: AvailabilityBlock[]) => {
  const blocked = new Set<string>();

  blocks.forEach((block) => {
    const start = parseISO(block.start_date);
    const end = parseISO(block.end_date);
    expandDateRange(start, end).forEach((date) => blocked.add(date));
  });

  return blocked;
};

export const fetchAvailability = async (rangeStart: Date, rangeEnd: Date) => {
  const { data, error } = await supabase
    .from('availability_blocks')
    .select('id, start_date, end_date, note')
    .lte('start_date', toIsoDate(rangeEnd))
    .gte('end_date', toIsoDate(rangeStart));

  if (error) {
    throw error;
  }

  return (data ?? []) as AvailabilityBlock[];
};

export const fetchNightlyPrices = async (rangeStart: Date, rangeEnd: Date) => {
  const { data, error } = await supabase
    .from('nightly_prices')
    .select('date, price_eur')
    .gte('date', toIsoDate(rangeStart))
    .lte('date', toIsoDate(rangeEnd));

  if (error) {
    throw error;
  }

  const priceMap = new Map<string, number>();
  (data ?? []).forEach((row) => {
    priceMap.set(row.date, row.price_eur);
  });

  return priceMap;
};
