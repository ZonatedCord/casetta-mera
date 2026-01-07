import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

type AdminGuardProps = {
  children: ReactNode;
  onRedirect: (path: string) => void;
};

export function AdminGuard({ children, onRedirect }: AdminGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const checkAdmin = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        if (isMounted) {
          setIsLoading(false);
          onRedirect('/admin/login');
        }
        return;
      }

      const userId = sessionData.session.user.id;
      const { data: adminRow, error: adminError } = await supabase
        .from('admin_users')
        .select('id, role')
        .eq('id', userId)
        .maybeSingle();

      if (isMounted) {
        if (adminError || !adminRow) {
          setIsAdmin(false);
          setErrorMessage('Accesso negato.');
        } else {
          setIsAdmin(true);
        }
        setIsLoading(false);
      }
    };

    checkAdmin();

    return () => {
      isMounted = false;
    };
  }, [onRedirect]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
          <p className="text-sm text-neutral-600">Verifica accesso in corso...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900">Accesso negato</h2>
          <p className="mt-3 text-sm text-neutral-600">
            {errorMessage || 'Non hai i permessi per accedere all\'area admin.'}
          </p>
          <button
            type="button"
            onClick={() => onRedirect('/admin/login')}
            className="mt-6 w-full rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Torna al login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
