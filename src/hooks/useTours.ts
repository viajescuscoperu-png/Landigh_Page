import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { tours as staticTours, type Tour } from '../data/tours';

interface TourRow {
  id: string;
  name: string;
  price: string;
  old_price: string;
  image: string;
  message: Tour['message'];
  includes: Tour['includes'];
  urgency: Tour['urgency'] | null;
  curiosity: Tour['curiosity'] | null;
  is_gold: boolean;
}

const rowToTour = (row: TourRow): Tour => ({
  id: row.id,
  name: row.name,
  price: row.price,
  oldPrice: row.old_price,
  image: row.image,
  message: row.message,
  includes: row.includes,
  urgency: row.urgency ?? undefined,
  curiosity: row.curiosity ?? undefined,
  isGold: row.is_gold,
});

export const useTours = () => {
  const [tours, setTours] = useState<Tour[]>(staticTours);
  const [loading, setLoading] = useState(supabase !== null);

  const refetch = useCallback(async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('tours')
      .select('id, name, price, old_price, image, message, includes, urgency, curiosity, is_gold')
      .order('sort_order');

    if (error) {
      console.error('Error loading tours:', error);
      return;
    }

    // Si la tabla existe pero todavía está vacía, seguimos mostrando los
    // tours estáticos en vez de dejar la landing sin ofertas.
    if (data && data.length > 0) {
      setTours(data.map(rowToTour));
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;

    (async () => {
      await refetch();
      setLoading(false);
    })();
  }, [refetch]);

  return { tours, loading, refetch };
};
