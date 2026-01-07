import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

type AdminGuardProps = {
  children: ReactNode;
};

export function AdminGuard({ children }: AdminGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAdmin = async () => {
      setIsLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        if (isMounted) {
          window.location.assign('/admin/login');
        }
        return;
      }

      const userId = sessionData.session.user.id;
      const { data: adminRow } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (isMounted) {
        if (!adminRow) {
          window.location.assign('/admin/login');
        } else {
          setIsAdmin(true);
        }
        setIsLoading(false);
      }
    };

    // Guard minimo per la prima area admin.
    checkAdmin();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-sm text-neutral-500">Verifica accesso...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
