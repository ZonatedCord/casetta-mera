import { AdminGuard } from '../../admin/AdminGuard';
import { AdminLayout } from '../../admin/AdminLayout';
import { AdminAvailabilityPage } from './Availability';
import { AdminDashboardPage } from './Dashboard';
import { AdminInquiriesPage } from './Inquiries';

const getAdminView = (pathname: string) => {
  if (pathname === '/admin/inquiries') return 'inquiries';
  if (pathname === '/admin/availability') return 'availability';
  return 'dashboard';
};

export function AdminIndexPage() {
  const view = getAdminView(window.location.pathname);

  return (
    <AdminGuard>
      <AdminLayout>
        {view === 'dashboard' ? <AdminDashboardPage /> : null}
        {view === 'inquiries' ? <AdminInquiriesPage /> : null}
        {view === 'availability' ? <AdminAvailabilityPage /> : null}
      </AdminLayout>
    </AdminGuard>
  );
}
