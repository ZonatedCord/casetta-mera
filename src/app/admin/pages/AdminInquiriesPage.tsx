import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const formatDateRange = (startDate?: string | null, endDate?: string | null) => {
  if (!startDate) return 'Data non disponibile';
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;
  const sameDay = start.toDateString() === end.toDateString();
  const startLabel = start.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
  const endLabel = end.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
  return sameDay ? startLabel : `${startLabel} - ${endLabel}`;
};

type Inquiry = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  check_in?: string | null;
  check_out?: string | null;
  guests?: number | null;
  source?: string | null;
  status?: string | null;
  created_at?: string | null;
};

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchInquiries = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase
      .from('inquiries')
      .select('id, created_at, name, email, phone, message, check_in, check_out, guests, source, status')
      .order('created_at', { ascending: false });

    if (error) {
      setErrorMessage('Errore nel caricamento delle richieste.');
      setIsLoading(false);
      return;
    }

    const rows = (data ?? []) as Inquiry[];
    setInquiries(rows);
    setSelectedInquiry(rows[0] ?? null);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-neutral-500">Caricamento richieste...</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900">Richieste</h3>
          <button
            type="button"
            onClick={fetchInquiries}
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600 transition hover:border-neutral-300"
          >
            Aggiorna
          </button>
        </div>
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {errorMessage}
          </div>
        ) : null}
        {inquiries.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-6 text-sm text-neutral-500">
            Nessuna richiesta disponibile.
          </div>
        ) : (
          inquiries.map((inquiry) => {
            const isActive = selectedInquiry?.id === inquiry.id;
            return (
              <button
                key={inquiry.id}
                type="button"
                onClick={() => setSelectedInquiry(inquiry)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  isActive
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                      {inquiry.name || inquiry.email || 'Senza nome'}
                    </p>
                    <p className={`mt-1 text-xs ${isActive ? 'text-neutral-200' : 'text-neutral-500'}`}>
                      {formatDateRange(inquiry.check_in, inquiry.check_out)}
                    </p>
                    <p className={`mt-1 text-[11px] ${isActive ? 'text-neutral-200' : 'text-neutral-400'}`}>
                      {inquiry.guests ? `${inquiry.guests} ospiti` : 'Ospiti: n/d'}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {inquiry.status || 'new'}
                  </span>
                </div>
                <p className={`mt-2 text-[11px] ${isActive ? 'text-neutral-200' : 'text-neutral-400'}`}>
                  {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString('it-IT') : 'Data n/d'}
                </p>
              </button>
            );
          })
        )}
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        {selectedInquiry ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Dettaglio</p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                {selectedInquiry.name || selectedInquiry.email || 'Richiesta'}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                {formatDateRange(selectedInquiry.check_in, selectedInquiry.check_out)}
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                {selectedInquiry.guests ? `${selectedInquiry.guests} ospiti` : 'Ospiti: n/d'}
              </p>
            </div>
            <div className="grid gap-3 text-sm text-neutral-600">
              {selectedInquiry.email ? <p>Email: {selectedInquiry.email}</p> : null}
              {selectedInquiry.phone ? <p>Telefono: {selectedInquiry.phone}</p> : null}
              {selectedInquiry.message ? (
                <p className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
                  {selectedInquiry.message}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-neutral-500">Seleziona una richiesta.</p>
        )}
      </div>
    </div>
  );
}
