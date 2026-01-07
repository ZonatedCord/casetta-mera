import { AdminLoginPage } from '../pages/admin/Login';
import { AdminIndexPage } from '../pages/admin';
import { AdminInquiriesPage } from '../pages/admin/Inquiries';
import { AdminAvailabilityPage } from '../pages/admin/Availability';

type AdminRoute = {
  path: string;
  element: JSX.Element;
};

// Mappa routes pronta per un router esterno.
export const adminRoutes: AdminRoute[] = [
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin', element: <AdminIndexPage /> },
  { path: '/admin/inquiries', element: <AdminInquiriesPage /> },
  { path: '/admin/availability', element: <AdminAvailabilityPage /> },
];
