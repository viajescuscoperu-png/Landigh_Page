import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { LocalizedString, Tour } from '../data/tours';
import { LANGS } from './constants';
import { Card, Field, TextInput, TextArea, PrimaryButton, TextButton } from './ui';

interface TourFormModalProps {
  tour?: Tour; // undefined = creando un tour nuevo
  onClose: () => void;
  onSaved: () => void;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const linesToArray = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const includesToText = (includes: LocalizedString[], lang: 'pt' | 'es' | 'en') =>
  includes.map((item) => item[lang]).join('\n');

const buildIncludes = (pt: string, es: string, en: string): LocalizedString[] => {
  const ptLines = linesToArray(pt);
  const esLines = linesToArray(es);
  const enLines = linesToArray(en);
  const max = Math.max(ptLines.length, esLines.length, enLines.length);

  return Array.from({ length: max }, (_, i) => ({
    pt: ptLines[i] || '',
    es: esLines[i] || '',
    en: enLines[i] || '',
  }));
};

const buildOptionalLocalized = (pt: string, es: string, en: string): LocalizedString | null => {
  if (!pt.trim() && !es.trim() && !en.trim()) return null;
  return { pt: pt.trim(), es: es.trim(), en: en.trim() };
};

export const TourFormModal = ({ tour, onClose, onSaved }: TourFormModalProps) => {
  const [name, setName] = useState(tour?.name ?? '');
  const [price, setPrice] = useState(tour?.price ?? '');
  const [oldPrice, setOldPrice] = useState(tour?.oldPrice ?? '');
  const [isGold, setIsGold] = useState(tour?.isGold ?? false);

  const [message, setMessage] = useState(tour?.message ?? { pt: '', es: '', en: '' });
  const [urgency, setUrgency] = useState(tour?.urgency ?? { pt: '', es: '', en: '' });
  const [curiosity, setCuriosity] = useState(tour?.curiosity ?? { pt: '', es: '', en: '' });
  const [includesText, setIncludesText] = useState({
    pt: tour ? includesToText(tour.includes, 'pt') : '',
    es: tour ? includesToText(tour.includes, 'es') : '',
    en: tour ? includesToText(tour.includes, 'en') : '',
  });

  const [image, setImage] = useState(tour?.image ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setError(null);

    try {
      const id = tour?.id ?? `${slugify(name) || 'tour'}-${Math.random().toString(36).slice(2, 7)}`;

      const payload = {
        name,
        price,
        old_price: oldPrice,
        image,
        message,
        includes: buildIncludes(includesText.pt, includesText.es, includesText.en),
        urgency: buildOptionalLocalized(urgency.pt, urgency.es, urgency.en),
        curiosity: buildOptionalLocalized(curiosity.pt, curiosity.es, curiosity.en),
        is_gold: isGold,
      };

      const { error: saveError } = tour
        ? await supabase.from('tours').update(payload).eq('id', tour.id)
        : await supabase.from('tours').insert({ id, sort_order: Math.floor(Date.now() / 1000), ...payload });

      if (saveError) throw saveError;

      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el tour.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-start justify-center overflow-y-auto p-4 py-10">
      <div className="bg-slate-100 rounded-2xl w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-brand-dark">{tour ? 'Editar tour' : 'Nuevo tour'}</h2>
            <TextButton type="button" onClick={onClose}>Cerrar</TextButton>
          </div>

          <Card title="Datos generales">
            <div className="space-y-3">
              <Field label="Nombre del tour">
                <TextInput required value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Precio anterior">
                  <TextInput required value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="380 USD" />
                </Field>
                <Field label="Precio actual">
                  <TextInput required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="299 USD" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <input type="checkbox" checked={isGold} onChange={(e) => setIsGold(e.target.checked)} />
                Marcar como Premium/Gold
              </label>
            </div>
          </Card>

          <Card title="Imagen">
            <div className="flex items-center gap-4">
              {image && (
                <img
                  src={image}
                  alt="Vista previa"
                  className="w-24 h-24 object-cover rounded-xl border border-slate-200 bg-slate-100"
                  onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                  onLoad={(e) => (e.currentTarget.style.visibility = 'visible')}
                />
              )}
              <div className="flex-grow">
                <Field label="Ruta de la imagen">
                  <TextInput
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/nuevo-tour.jpg"
                  />
                </Field>
                <p className="text-xs text-slate-400 mt-1">
                  Sube el archivo a la carpeta <code>public/</code> del proyecto (por ejemplo con Git) y
                  escribe acá el mismo nombre, con "/" adelante.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Mensaje de WhatsApp">
            <div className="space-y-3">
              {LANGS.map(({ key, flag, label }) => (
                <Field key={key} label={`${flag} ${label}`}>
                  <TextArea
                    rows={2}
                    required
                    value={message[key]}
                    onChange={(e) => setMessage((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </Field>
              ))}
            </div>
          </Card>

          <Card title="Incluye (una línea por ítem)">
            <div className="space-y-3">
              {LANGS.map(({ key, flag, label }) => (
                <Field key={key} label={`${flag} ${label}`}>
                  <TextArea
                    rows={4}
                    value={includesText[key]}
                    onChange={(e) => setIncludesText((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </Field>
              ))}
            </div>
          </Card>

          <Card title="Urgencia (opcional, ej. '¡Últimos cupos!')">
            <div className="space-y-3">
              {LANGS.map(({ key, flag, label }) => (
                <Field key={key} label={`${flag} ${label}`}>
                  <TextInput value={urgency[key]} onChange={(e) => setUrgency((prev) => ({ ...prev, [key]: e.target.value }))} />
                </Field>
              ))}
            </div>
          </Card>

          <Card title="Dato curioso (opcional, tarjeta '¿Sabías que?')">
            <div className="space-y-3">
              {LANGS.map(({ key, flag, label }) => (
                <Field key={key} label={`${flag} ${label}`}>
                  <TextArea
                    rows={2}
                    value={curiosity[key]}
                    onChange={(e) => setCuriosity((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </Field>
              ))}
            </div>
          </Card>

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          <div className="flex items-center gap-4">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? 'Guardando...' : tour ? 'Guardar cambios' : 'Crear tour'}
            </PrimaryButton>
            <TextButton type="button" onClick={onClose}>Cancelar</TextButton>
          </div>
        </form>
      </div>
    </div>
  );
};
