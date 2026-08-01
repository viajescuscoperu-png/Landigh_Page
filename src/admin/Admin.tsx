import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { CenteredCard } from './ui';

export const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(supabase !== null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <CenteredCard>
        <p className="text-center text-slate-600">
          Supabase no está configurado. Agrega <code>VITE_SUPABASE_URL</code> y{' '}
          <code>VITE_SUPABASE_ANON_KEY</code> para usar el panel de administrador.
        </p>
      </CenteredCard>
    );
  }

  if (checkingSession) {
    return (
      <CenteredCard>
        <p className="text-center text-slate-400">Cargando...</p>
      </CenteredCard>
    );
  }

  return session ? <AdminDashboard /> : <AdminLogin />;
};
