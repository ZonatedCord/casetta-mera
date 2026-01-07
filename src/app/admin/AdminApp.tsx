import { useCallback } from 'react';
import { AdminGuard } from './AdminGuard';
import { AdminLayout } from './AdminLayout';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminInquiriesPage } from './pages/AdminInquiriesPage';
import { AdminAvailabilityPage } from './pages/AdminAvailabilityPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

type AdminAppProps = {
  pathname: string;
  onNavigate: (path: string) => void;
};

const getAdminView = (pathname: string) => {
  if (pathname === '/admin/login') return 'login';
  if (pathname === '/admin/inquiries') return 'inquiries';
  if (pathname === '/admin/availability') return 'availability';
  return 'dashboard';
};

export function AdminApp({ pathname, onNavigate }: AdminAppProps) {
  const navigate = useCallback(
    (path: string) => {
      if (path === pathname) return;
      window.history.pushState({}, '', path);
      onNavigate(path);
    },
    [onNavigate, pathname]
  );

  const view = getAdminView(pathname);

  if (view === 'login') {
    return <AdminLoginPage onSuccess={() => navigate('/admin')} />;
  }

  return (
    <AdminGuard onRedirect={navigate}>
      <AdminLayout
        activePath={
          view === 'dashboard'
            ? '/admin'
            : view === 'inquiries'
            ? '/admin/inquiries'
            : '/admin/availability'
        }
        onNavigate={navigate}
        title={
          view === 'dashboard'
            ? 'Dashboard'
            : view === 'inquiries'
            ? 'Richieste'
            : 'Disponibilita'
        }
        subtitle={
          view === 'dashboard'
            ? 'Panoramica rapida dell\'operativita.'
            : view === 'inquiries'
            ? 'Gestisci le richieste arrivate dal sito.'
            : 'Blocca rapidamente le date non disponibili.'
        }
      >
        {view === 'dashboard' ? <AdminDashboardPage /> : null}
        {view === 'inquiries' ? <AdminInquiriesPage /> : null}
        {view === 'availability' ? <AdminAvailabilityPage /> : null}
      </AdminLayout>
    </AdminGuard>
  );
}
