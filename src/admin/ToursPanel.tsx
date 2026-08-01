import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTours } from '../hooks/useTours';
import type { Tour } from '../data/tours';
import { TourFormModal } from './TourFormModal';
import { PrimaryButton, TextButton, DangerTextButton } from './ui';

export const ToursPanel = () => {
  const { tours, loading, refetch } = useTours();
  const [editingTour, setEditingTour] = useState<Tour | 'new' | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (tour: Tour) => {
    if (!supabase) return;
    if (!window.confirm(`¿Eliminar "${tour.name}"? Esta acción no se puede deshacer.`)) return;

    setDeletingId(tour.id);
    const { error } = await supabase.from('tours').delete().eq('id', tour.id);
    if (error) {
      alert('No se pudo eliminar el tour: ' + error.message);
    } else {
      await refetch();
    }
    setDeletingId(null);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-brand-dark">Tours</h2>
        <PrimaryButton type="button" className="px-4 py-2 text-sm" onClick={() => setEditingTour('new')}>
          + Nuevo tour
        </PrimaryButton>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Cargando tours...</p>
      ) : (
        <div className="space-y-2">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="flex items-center gap-4 border border-slate-100 rounded-xl p-3"
            >
              <img src={tour.image} alt={tour.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
              <div className="flex-grow min-w-0">
                <p className="font-bold text-slate-700 text-sm truncate">{tour.name}</p>
                <p className="text-slate-400 text-xs">
                  <span className="line-through">{tour.oldPrice}</span> → {tour.price}
                  {tour.isGold && <span className="ml-2 text-amber-500 font-bold">PREMIUM</span>}
                </p>
              </div>
              <TextButton type="button" onClick={() => setEditingTour(tour)}>Editar</TextButton>
              <DangerTextButton type="button" disabled={deletingId === tour.id} onClick={() => handleDelete(tour)}>
                {deletingId === tour.id ? 'Eliminando...' : 'Eliminar'}
              </DangerTextButton>
            </div>
          ))}
        </div>
      )}

      {editingTour && (
        <TourFormModal
          tour={editingTour === 'new' ? undefined : editingTour}
          onClose={() => setEditingTour(null)}
          onSaved={refetch}
        />
      )}
    </section>
  );
};
