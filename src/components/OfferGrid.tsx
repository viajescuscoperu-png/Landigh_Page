import React from 'react';
import { tours } from '../data/tours';
import { TourCard } from './TourCard';

interface OfferGridProps {
  onAction: (tourName: string) => void;
}

export const OfferGrid: React.FC<OfferGridProps> = ({ onAction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onAction={() => onAction(tour.name)} />
      ))}
    </div>
  );
};
