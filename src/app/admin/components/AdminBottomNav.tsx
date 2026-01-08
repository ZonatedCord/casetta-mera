import { Calendar, Inbox, LayoutDashboard } from 'lucide-react';

type AdminBottomNavProps = {
  activePath: string;
  onNavigate: (path: string) => void;
};

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Richieste', path: '/admin/inquiries', icon: Inbox },
  { label: 'Calendario', path: '/admin/availability', icon: Calendar },
];

export function AdminBottomNav({ activePath, onNavigate }: AdminBottomNavProps) {
  return (
    <div className="flex items-center justify-between">
      {navItems.map((item) => {
        const isActive = activePath === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            type="button"
            onClick={() => onNavigate(item.path)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition ${
              isActive
                ? 'bg-[var(--matcha-brew)] text-white shadow-sm'
                : 'text-[var(--forest-roast)]/70 hover:bg-[var(--almond)]/20'
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
