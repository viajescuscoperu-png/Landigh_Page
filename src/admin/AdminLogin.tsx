import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CenteredCard, Field, TextInput, PrimaryButton } from './ui';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setSubmitting(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);
    if (error) setError('Email o contraseña incorrectos.');
  };

  return (
    <CenteredCard>
      <h1 className="text-2xl font-black text-brand-dark text-center mb-1">Panel de administrador</h1>
      <p className="text-slate-500 text-center text-sm mb-6">Viajes Cusco Perú</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <Field label="Email">
          <TextInput type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Contraseña">
          <TextInput type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <PrimaryButton type="submit" disabled={submitting} className="w-full py-3">
          {submitting ? 'Ingresando...' : 'Ingresar'}
        </PrimaryButton>
      </form>
    </CenteredCard>
  );
};
