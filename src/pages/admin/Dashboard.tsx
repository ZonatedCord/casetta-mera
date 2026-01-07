export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-900">Admin Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Tot richieste</p>
          <p className="mt-3 text-3xl font-semibold text-neutral-900">--</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Date bloccate</p>
          <p className="mt-3 text-3xl font-semibold text-neutral-900">--</p>
        </div>
      </div>
    </div>
  );
}
