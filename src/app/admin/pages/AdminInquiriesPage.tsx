import { useEffect, useMemo, useState } from 'react';
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
  is_read?: boolean | null;
  admin_notes?: string | null;
};

const statusOptions = ['new', 'in_progress', 'replied', 'booked', 'closed'] as const;
const statusLabels: Record<string, string> = {
  new: 'Nuova',
  in_progress: 'In lavorazione',
  replied: 'Risposto',
  booked: 'Prenotato',
  closed: 'Chiuso',
};
const getStatusLabel = (status?: string | null, isRead?: boolean | null) => {
  if (status === 'new' && isRead) return 'Letta';
  return statusLabels[status ?? ''] ?? status ?? 'Nuova';
};
const getStatusClasses = (status?: string | null, isRead?: boolean | null) => {
  if (status === 'new' && isRead) {
    return 'bg-[var(--almond)]/40 text-[var(--forest-roast)]';
  }
  switch (status) {
    case 'in_progress':
      return 'bg-[var(--almond)]/40 text-[var(--forest-roast)]';
    case 'replied':
      return 'bg-[var(--forest-roast)]/15 text-[var(--forest-roast)]';
    case 'booked':
      return 'bg-[var(--matcha-brew)] text-white';
    case 'closed':
      return 'bg-[var(--eclipse)]/15 text-[var(--eclipse)]';
    case 'new':
    default:
      return 'bg-[var(--matcha-brew)]/15 text-[var(--matcha-brew)]';
  }
};

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');
  const [notesStatus, setNotesStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [unreadOnly, setUnreadOnly] = useState(false);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase
      .from('inquiries')
      .select(
        'id, created_at, name, email, phone, message, check_in, check_out, guests, source, status, is_read, admin_notes'
      )
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

  const unreadCount = useMemo(
    () => inquiries.filter((inquiry) => !inquiry.is_read).length,
    [inquiries]
  );

  const filteredInquiries = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return inquiries.filter((inquiry) => {
      if (unreadOnly && inquiry.is_read) return false;
      if (statusFilter !== 'all' && inquiry.status !== statusFilter) return false;
      if (!term) return true;
      const haystack = `${inquiry.name ?? ''} ${inquiry.email ?? ''}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [inquiries, searchTerm, statusFilter, unreadOnly]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    if (!selectedInquiry) return;
    setNotesDraft(selectedInquiry.admin_notes ?? '');
    setNotesStatus('idle');
  }, [selectedInquiry?.id]);

  useEffect(() => {
    if (!selectedInquiry) return;
    if (notesDraft === (selectedInquiry.admin_notes ?? '')) return;

    setNotesStatus('saving');
    const timeoutId = window.setTimeout(async () => {
      const { error } = await supabase
        .from('inquiries')
        .update({ admin_notes: notesDraft })
        .eq('id', selectedInquiry.id);

      if (error) {
        console.error('Supabase update admin_notes failed', error);
        setNotesStatus('error');
        return;
      }

      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === selectedInquiry.id ? { ...inquiry, admin_notes: notesDraft } : inquiry
        )
      );
      setSelectedInquiry((prev) =>
        prev ? { ...prev, admin_notes: notesDraft } : prev
      );
      setNotesStatus('saved');
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [notesDraft, selectedInquiry]);

  const updateInquiry = async (id: string, updates: Partial<Inquiry>) => {
    const { data, error } = await supabase
      .from('inquiries')
      .update(updates)
      .eq('id', id)
      .select('id, status, is_read, admin_notes')
      .single();

    if (error || !data) {
      console.error('Supabase update inquiry failed', { error, updates });
      setErrorMessage('Aggiornamento fallito. Verifica i permessi admin.');
      return false;
    }

    setInquiries((prev) =>
      prev.map((inquiry) => (inquiry.id === id ? { ...inquiry, ...data } : inquiry))
    );
    setSelectedInquiry((prev) => (prev ? { ...prev, ...data } : prev));
    return true;
  };

  const deleteInquiry = async (id: string) => {
    const confirmed = window.confirm('Eliminare definitivamente questa richiesta?');
    if (!confirmed) return false;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete inquiry failed', error);
      setErrorMessage('Eliminazione fallita. Riprova.');
      return false;
    }
    setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
    setSelectedInquiry(null);
    setIsDrawerOpen(false);
    return true;
  };

  const handleSelectInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDrawerOpen(true);
  };

  const buildSummary = (inquiry: Inquiry) => {
    const lines = [
      `ID: ${inquiry.id}`,
      `Nome: ${inquiry.name ?? 'n/d'}`,
      `Email: ${inquiry.email ?? 'n/d'}`,
      `Telefono: ${inquiry.phone ?? 'n/d'}`,
      `Check-in: ${inquiry.check_in ?? 'n/d'}`,
      `Check-out: ${inquiry.check_out ?? 'n/d'}`,
      `Ospiti: ${inquiry.guests ?? 'n/d'}`,
      `Stato: ${getStatusLabel(inquiry.status, inquiry.is_read)}`,
      `Messaggio: ${inquiry.message ?? 'n/d'}`,
    ];
    return lines.join('\n');
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setErrorMessage(`${label} copiato negli appunti.`);
    } catch (error) {
      console.error('Clipboard copy failed', error);
      setErrorMessage('Impossibile copiare negli appunti.');
    }
  };

  const buildMailto = (inquiry: Inquiry) => {
    const subject = `[Casetta Mera] Richiesta ${inquiry.name ?? ''}`.trim();
    const body = buildSummary(inquiry);
    const email = inquiry.email ?? '';
    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const buildWhatsApp = (phone: string) => {
    const normalized = phone.replace(/[^\d+]/g, '');
    const waNumber = normalized.startsWith('+') ? normalized.slice(1) : normalized;
    return `https://wa.me/${waNumber}`;
  };

  if (isLoading) {
    return <p className="text-sm text-[var(--forest-roast)]/60">Caricamento richieste...</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[var(--eclipse)]">Richieste</h3>
            <p className="text-xs text-[var(--forest-roast)]/70">Non lette: {unreadCount}</p>
          </div>
          <button
            type="button"
            onClick={fetchInquiries}
            className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-1 text-xs font-semibold text-[var(--forest-roast)]/80 transition hover:border-[var(--forest-roast)]/40"
          >
            Aggiorna
          </button>
        </div>
        <div className="grid gap-3 rounded-2xl border border-[var(--forest-roast)]/10 bg-white p-4">
          <input
            type="text"
            placeholder="Cerca per nome o email"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-2xl border border-[var(--forest-roast)]/20 px-3 py-2 text-sm text-[var(--eclipse)] outline-none transition focus:border-[var(--matcha-brew)]"
          />
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-full border border-[var(--forest-roast)]/20 bg-white px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
            >
              <option value="all">Tutti gli stati</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {getStatusLabel(option)}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-xs text-[var(--forest-roast)]/70">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(event) => setUnreadOnly(event.target.checked)}
              />
              Solo non lette
            </label>
          </div>
        </div>
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {errorMessage}
          </div>
        ) : null}
        {filteredInquiries.length === 0 ? (
          <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 px-4 py-6 text-sm text-[var(--forest-roast)]/70">
            Nessuna richiesta disponibile.
          </div>
        ) : (
          filteredInquiries.map((inquiry) => {
            const isActive = selectedInquiry?.id === inquiry.id;
            return (
              <button
                key={inquiry.id}
                type="button"
                onClick={() => handleSelectInquiry(inquiry)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  isActive
                    ? 'border-[var(--matcha-brew)] bg-[var(--matcha-brew)] text-white'
                    : 'border-[var(--forest-roast)]/10 bg-white hover:border-[var(--forest-roast)]/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-[var(--eclipse)]'}`}>
                      {inquiry.name || inquiry.email || 'Senza nome'}
                    </p>
                    <p className={`mt-1 text-xs ${isActive ? 'text-white/70' : 'text-[var(--forest-roast)]/70'}`}>
                      {formatDateRange(inquiry.check_in, inquiry.check_out)}
                    </p>
                    <p className={`mt-1 text-[11px] ${isActive ? 'text-white/70' : 'text-[var(--forest-roast)]/60'}`}>
                      {inquiry.guests ? `${inquiry.guests} ospiti` : 'Ospiti: n/d'}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : getStatusClasses(inquiry.status, inquiry.is_read)
                    }`}
                  >
                    {getStatusLabel(inquiry.status, inquiry.is_read)}
                  </span>
                </div>
                <p className={`mt-2 text-[11px] ${isActive ? 'text-white/70' : 'text-[var(--forest-roast)]/60'}`}>
                  {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString('it-IT') : 'Data n/d'}
                </p>
              </button>
            );
          })
        )}
      </div>
      <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 p-5">
        {selectedInquiry ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Dettaglio</p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--eclipse)]">
                {selectedInquiry.name || selectedInquiry.email || 'Richiesta'}
              </h3>
              <p className="mt-2 text-sm text-[var(--forest-roast)]/70">
                {formatDateRange(selectedInquiry.check_in, selectedInquiry.check_out)}
              </p>
              <p className="mt-1 text-xs text-[var(--forest-roast)]/60">
                {selectedInquiry.guests ? `${selectedInquiry.guests} ospiti` : 'Ospiti: n/d'}
              </p>
            </div>
            <div className="grid gap-3 text-sm text-[var(--forest-roast)]/80">
              {selectedInquiry.email ? <p>Email: {selectedInquiry.email}</p> : null}
              {selectedInquiry.phone ? <p>Telefono: {selectedInquiry.phone}</p> : null}
              {selectedInquiry.message ? (
                <p className="rounded-2xl border border-[var(--forest-roast)]/10 bg-white p-4 text-sm text-[var(--forest-roast)]/80">
                  {selectedInquiry.message}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--forest-roast)]/60">Seleziona una richiesta.</p>
        )}
      </div>
      {isDrawerOpen && selectedInquiry ? (
        <div className="fixed inset-0 z-20 flex justify-end bg-black/30 p-4">
          <div className="flex h-full w-full max-w-xl flex-col rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Dettaglio richiesta</p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--eclipse)]">
                  {selectedInquiry.name || selectedInquiry.email || 'Richiesta'}
                </h3>
                <p className="mt-1 text-xs text-[var(--forest-roast)]/60">
                  {selectedInquiry.created_at
                    ? new Date(selectedInquiry.created_at).toLocaleString('it-IT')
                    : 'Data n/d'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-1 text-xs font-semibold text-[var(--forest-roast)]/80"
              >
                Chiudi
              </button>
            </div>

            <div className="mt-6 space-y-4 overflow-y-auto">
              <div className="grid gap-2 rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 p-4 text-sm text-[var(--forest-roast)]/80">
                <p>ID: {selectedInquiry.id}</p>
                <p>Nome: {selectedInquiry.name ?? 'n/d'}</p>
                <p>Email: {selectedInquiry.email ?? 'n/d'}</p>
                <p>Telefono: {selectedInquiry.phone ?? 'n/d'}</p>
                <p>Check-in: {selectedInquiry.check_in ?? 'n/d'}</p>
                <p>Check-out: {selectedInquiry.check_out ?? 'n/d'}</p>
                <p>Ospiti: {selectedInquiry.guests ?? 'n/d'}</p>
                <p>Source: {selectedInquiry.source ?? 'n/d'}</p>
                <p>Stato: {getStatusLabel(selectedInquiry.status, selectedInquiry.is_read)}</p>
              </div>

              {selectedInquiry.message ? (
                <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-white p-4 text-sm text-[var(--forest-roast)]/80">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Messaggio</p>
                  <p className="mt-2 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              ) : null}

              <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Note interne</p>
                  <span className="text-[11px] text-[var(--forest-roast)]/60">
                    {notesStatus === 'saving' ? 'Salvataggio...' : notesStatus === 'saved' ? 'Salvato' : ''}
                  </span>
                </div>
                <textarea
                  value={notesDraft}
                  onChange={(event) => setNotesDraft(event.target.value)}
                  placeholder="Aggiungi note interne..."
                  className="mt-3 min-h-[120px] w-full rounded-2xl border border-[var(--forest-roast)]/20 px-3 py-2 text-sm text-[var(--forest-roast)]/80 outline-none transition focus:border-[var(--matcha-brew)]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => updateInquiry(selectedInquiry.id, { is_read: true })}
                  className="rounded-full bg-[var(--matcha-brew)] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[var(--eclipse)]"
                >
                  Segna come letta
                </button>
                <button
                  type="button"
                  onClick={() => updateInquiry(selectedInquiry.id, { is_read: false })}
                  className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
                >
                  Segna come non letta
                </button>
                <select
                  value={selectedInquiry.status ?? 'new'}
                  onChange={(event) =>
                    updateInquiry(selectedInquiry.id, { status: event.target.value })
                  }
                  className="rounded-full border border-[var(--forest-roast)]/20 bg-white px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {getStatusLabel(option)}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => updateInquiry(selectedInquiry.id, { status: 'closed' })}
                  className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
                >
                  Chiudi
                </button>
                <button
                  type="button"
                  onClick={() => deleteInquiry(selectedInquiry.id)}
                  className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600"
                >
                  Elimina
                </button>
              </div>

              <div className="grid gap-2 rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Azioni rapide</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(buildSummary(selectedInquiry), 'Riepilogo')}
                    className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
                  >
                    Copia riepilogo
                  </button>
                  <a
                    href={buildMailto(selectedInquiry)}
                    className="rounded-full bg-[var(--matcha-brew)] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[var(--eclipse)]"
                  >
                    Apri mail
                  </a>
                  {selectedInquiry.phone ? (
                    <a
                      href={buildWhatsApp(selectedInquiry.phone)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
                    >
                      Apri WhatsApp
                    </a>
                  ) : null}
                  {selectedInquiry.email ? (
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedInquiry.email ?? '', 'Email')}
                      className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
                    >
                      Copia email
                    </button>
                  ) : null}
                  {selectedInquiry.phone ? (
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedInquiry.phone ?? '', 'Telefono')}
                      className="rounded-full border border-[var(--forest-roast)]/20 px-3 py-2 text-xs font-semibold text-[var(--forest-roast)]/80"
                    >
                      Copia telefono
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
