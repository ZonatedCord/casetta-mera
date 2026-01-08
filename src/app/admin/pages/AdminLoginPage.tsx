import { useState, type FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';

type AdminLoginPageProps = {
  onSuccess: () => void;
};

export function AdminLoginPage({ onSuccess }: AdminLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage('Credenziali non valide.');
      setIsLoading(false);
      return;
    }

    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[var(--almond)]/15 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-[var(--forest-roast)]/10 bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--forest-roast)]/60">Casetta Mera</p>
        <h1 className="mt-2 text-2xl font-semibold text-[var(--eclipse)]">Accesso admin</h1>
        <p className="mt-2 text-sm text-[var(--forest-roast)]/70">
          Inserisci le credenziali per accedere alla dashboard.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-[var(--forest-roast)]">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--forest-roast)]/20 px-4 py-3 text-sm text-[var(--eclipse)] outline-none transition focus:border-[var(--matcha-brew)]"
            />
          </label>
          <label className="block text-sm font-medium text-[var(--forest-roast)]">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--forest-roast)]/20 px-4 py-3 text-sm text-[var(--eclipse)] outline-none transition focus:border-[var(--matcha-brew)]"
            />
          </label>
          {errorMessage ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {errorMessage}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-[var(--matcha-brew)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--eclipse)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Accesso in corso...' : 'Entra'}
          </button>
        </form>
      </div>
    </div>
  );
}
