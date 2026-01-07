import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type Inquiry = {
  id: string;
  name: string | null;
  created_at: string | null;
  status: string | null;
};

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data } = await supabase
        .from('inquiries')
        .select('id, name, created_at, status')
        .order('created_at', { ascending: false });

      setInquiries((data ?? []) as Inquiry[]);
      setIsLoading(false);
    };

    // MVP: solo read.
    fetchInquiries();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-neutral-500">Caricamento richieste...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Richieste</h2>
      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-2xl border border-neutral-200 p-4">
            <p className="text-sm font-semibold text-neutral-900">
              {inquiry.name || 'Senza nome'}
            </p>
            <p className="mt-1 text-xs text-neutral-500">{inquiry.created_at || 'Data non disponibile'}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
              {inquiry.status || 'Nuova'}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
        Placeholder dettaglio richiesta.
      </div>
    </div>
  );
}
