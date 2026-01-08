import { Calendar, Inbox, LayoutDashboard, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

type AdminSidebarProps = {
  activePath: string;
  onNavigate: (path: string) => void;
};

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Richieste', path: '/admin/inquiries', icon: Inbox },
  { label: 'Calendario', path: '/admin/availability', icon: Calendar },
];

export function AdminSidebar({ activePath, onNavigate }: AdminSidebarProps) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onNavigate('/admin/login');
  };

  return (
    <aside className="flex h-full w-full flex-col justify-between border-r border-[var(--forest-roast)]/10 bg-white px-5 py-6">
      <div>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Casetta Mera</p>
          <h1 className="mt-2 text-lg font-semibold text-[var(--eclipse)]">Admin</h1>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => onNavigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[var(--matcha-brew)] text-white shadow-sm'
                    : 'text-[var(--forest-roast)]/80 hover:bg-[var(--almond)]/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[var(--forest-roast)]/70 transition hover:bg-[var(--almond)]/20"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}
