import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type AvailabilityBlock = {
  id: string;
  start_date: string;
  end_date: string;
};

export function AdminAvailabilityPage() {
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      const { data } = await supabase
        .from('availability_blocks')
        .select('id, start_date, end_date')
        .order('start_date', { ascending: true });

      setBlocks((data ?? []) as AvailabilityBlock[]);
      setIsLoading(false);
    };

    fetchBlocks();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-neutral-500">Caricamento blocchi...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Disponibilita</h2>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
        Placeholder calendario.
      </div>
      <div className="space-y-3">
        {blocks.map((block) => (
          <div key={block.id} className="rounded-2xl border border-neutral-200 p-4 text-sm">
            {block.start_date} - {block.end_date}
          </div>
        ))}
      </div>
    </div>
  );
}
