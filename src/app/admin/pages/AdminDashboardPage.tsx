export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Richieste</p>
          <p className="mt-3 text-2xl font-semibold text-neutral-900">Monitoraggio live</p>
          <p className="mt-2 text-sm text-neutral-500">
            Tieni d\'occhio le nuove richieste arrivate dal sito.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Disponibilita</p>
          <p className="mt-3 text-2xl font-semibold text-neutral-900">Blocchi rapidi</p>
          <p className="mt-2 text-sm text-neutral-500">
            Aggiorna il calendario per evitare doppie prenotazioni.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Admin</p>
          <p className="mt-3 text-2xl font-semibold text-neutral-900">Accesso sicuro</p>
          <p className="mt-2 text-sm text-neutral-500">
            Solo utenti autorizzati possono usare la dashboard.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-neutral-900">Prossimi passi</h3>
        <p className="mt-2 text-sm text-neutral-500">
          Collega nuove funzioni operative appena serve (pagamenti, notifiche, export).
        </p>
      </div>
    </div>
  );
}
