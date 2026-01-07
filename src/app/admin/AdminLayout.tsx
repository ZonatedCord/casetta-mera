import { type ReactNode } from 'react';
import { AdminBottomNav } from './components/AdminBottomNav';
import { AdminSidebar } from './components/AdminSidebar';

type AdminLayoutProps = {
  children: ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
  title: string;
  subtitle?: string;
};

export function AdminLayout({ children, activePath, onNavigate, title, subtitle }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-6 md:px-6">
        <div className="hidden w-64 shrink-0 md:block">
          <AdminSidebar activePath={activePath} onNavigate={onNavigate} />
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="rounded-3xl border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Area admin</p>
            <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
            {subtitle ? <p className="mt-2 text-sm text-neutral-500">{subtitle}</p> : null}
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 left-4 right-4 z-10 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-lg md:hidden">
        <AdminBottomNav activePath={activePath} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
