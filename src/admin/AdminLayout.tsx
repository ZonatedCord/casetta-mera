import { type ReactNode } from 'react';

type AdminLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Richieste', path: '/admin/inquiries' },
  { label: 'Calendario', path: '/admin/availability' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const activePath = window.location.pathname;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-6 py-8">
        <aside className="w-56 shrink-0 rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Casetta Mera</p>
          <h1 className="mt-2 text-lg font-semibold">Admin</h1>
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                  activePath === item.path
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="flex-1 rounded-2xl border border-neutral-200 bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
