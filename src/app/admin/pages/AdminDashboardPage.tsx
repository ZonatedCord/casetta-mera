export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Richieste</p>
          <p className="mt-3 text-2xl font-semibold text-[var(--eclipse)]">Monitoraggio live</p>
          <p className="mt-2 text-sm text-[var(--forest-roast)]/70">
            Tieni d\'occhio le nuove richieste arrivate dal sito.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Disponibilita</p>
          <p className="mt-3 text-2xl font-semibold text-[var(--eclipse)]">Blocchi rapidi</p>
          <p className="mt-2 text-sm text-[var(--forest-roast)]/70">
            Aggiorna il calendario per evitare doppie prenotazioni.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-[var(--almond)]/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Admin</p>
          <p className="mt-3 text-2xl font-semibold text-[var(--eclipse)]">Accesso sicuro</p>
          <p className="mt-2 text-sm text-[var(--forest-roast)]/70">
            Solo utenti autorizzati possono usare la dashboard.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-[var(--forest-roast)]/10 bg-white p-5">
        <h3 className="text-lg font-semibold text-[var(--eclipse)]">Prossimi passi</h3>
        <p className="mt-2 text-sm text-[var(--forest-roast)]/70">
          Collega nuove funzioni operative appena serve (pagamenti, notifiche, export).
        </p>
      </div>
    </div>
  );
}
