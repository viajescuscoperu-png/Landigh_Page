import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { tours as staticTours, type Tour, type Audience, type LocalizedString } from '../data/tours';

interface TourRow {
  id: string;
  name: string;
  image: string;
  includes: Tour['includes'];
  urgency: Tour['urgency'] | null;
  curiosity: Tour['curiosity'] | null;
  is_gold: boolean;
  audience: Audience;
  price_foreign: string | null;
  old_price_foreign: string | null;
  message_foreign: LocalizedString | null;
  price_national: string | null;
  old_price_national: string | null;
  message_national: LocalizedString | null;
}

const rowToTour = (row: TourRow): Tour => ({
  id: row.id,
  name: row.name,
  image: row.image,
  includes: row.includes,
  urgency: row.urgency ?? undefined,
  curiosity: row.curiosity ?? undefined,
  isGold: row.is_gold,
  audience: row.audience,
  foreign: row.price_foreign && row.old_price_foreign && row.message_foreign
    ? { price: row.price_foreign, oldPrice: row.old_price_foreign, message: row.message_foreign }
    : undefined,
  national: row.price_national && row.old_price_national && row.message_national
    ? { price: row.price_national, oldPrice: row.old_price_national, message: row.message_national }
    : undefined,
});

export const useTours = () => {
  const [tours, setTours] = useState<Tour[]>(staticTours);
  const [loading, setLoading] = useState(supabase !== null);

  const refetch = useCallback(async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('tours')
      .select('id, name, image, includes, urgency, curiosity, is_gold, audience, price_foreign, old_price_foreign, message_foreign, price_national, old_price_national, message_national')
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
