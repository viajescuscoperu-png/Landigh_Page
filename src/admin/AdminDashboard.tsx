import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useSiteContent, type SiteContent } from '../hooks/useSiteContent';
import { ToursPanel } from './ToursPanel';
import { LANGS } from './constants';
import { Card, Field, TextInput, TextArea, PrimaryButton, TextButton } from './ui';

type Tab = 'general' | 'tours';

export const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>('general');
  const handleLogout = () => supabase?.auth.signOut();

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-brand-dark">Panel de administrador</h1>
          <TextButton onClick={handleLogout}>Cerrar sesión</TextButton>
        </div>

        <div className="flex gap-2">
          <TabButton active={tab === 'general'} onClick={() => setTab('general')}>General</TabButton>
          <TabButton active={tab === 'tours'} onClick={() => setTab('tours')}>Tours</TabButton>
        </div>

        {tab === 'general' ? <GeneralSettings /> : <ToursPanel />}
      </div>
    </div>
  );
};

const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
      active ? 'bg-brand-orange text-white' : 'bg-white text-slate-500 border border-slate-200'
    }`}
  >
    {children}
  </button>
);

const GeneralSettings = () => {
  const { content, loading } = useSiteContent();

  if (loading) return <p className="text-slate-400">Cargando contenido...</p>;

  // GeneralSettingsForm solo se monta acá, ya con "content" listo, así que
  // puede usar el valor inicial directo en useState en vez de un useEffect.
  return <GeneralSettingsForm initialContent={content} />;
};

const GeneralSettingsForm = ({ initialContent }: { initialContent: SiteContent }) => {
  const [countdownTarget, setCountdownTarget] = useState(initialContent.countdownTarget);
  const [heroSubtitle, setHeroSubtitle] = useState(initialContent.heroSubtitle);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  const handleSave = async () => {
    if (!supabase) return;

    setSaving(true);
    setStatus('idle');

    const { error } = await supabase
      .from('site_content')
      .update({
        countdown_target: countdownTarget,
        hero_subtitle_pt: heroSubtitle.pt,
        hero_subtitle_es: heroSubtitle.es,
        hero_subtitle_en: heroSubtitle.en,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    setSaving(false);
    setStatus(error ? 'error' : 'saved');
  };

  return (
    <div className="space-y-6">
      <Card title="Fecha del contador (oferta expira en)">
        <TextInput
          type="datetime-local"
          step="1"
          value={countdownTarget}
          onChange={(e) => setCountdownTarget(e.target.value)}
          className="max-w-xs"
        />
      </Card>

      <Card title="Subtítulo debajo del título principal">
        <div className="space-y-3">
          {LANGS.map(({ key, flag, label }) => (
            <Field key={key} label={`${flag} ${label}`}>
              <TextArea
                rows={2}
                value={heroSubtitle[key]}
                onChange={(e) => setHeroSubtitle((prev) => ({ ...prev, [key]: e.target.value }))}
              />
            </Field>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <PrimaryButton onClick={handleSave} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </PrimaryButton>
        {status === 'saved' && <span className="text-green-600 font-bold text-sm">Guardado ✓</span>}
        {status === 'error' && <span className="text-red-500 font-bold text-sm">Error al guardar</span>}
      </div>
    </div>
  );
};
