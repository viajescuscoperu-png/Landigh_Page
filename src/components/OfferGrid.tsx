import { tours } from '../data/tours';
import { TourCard } from './TourCard';
import { useLanguage } from '../context/LanguageContext';

interface OfferGridProps {
  onAction: (tourName: string) => void;
}

export const OfferGrid = ({ onAction }: OfferGridProps) => {
  const { langText } = useLanguage();
  return (
    <section className="mb-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-brand-dark mb-2">{langText('offer_title_1')} <span className="text-brand-orange">{langText('offer_title_2')}</span></h2>
        <p className="text-slate-500">{langText('offer_subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} onAction={() => onAction(tour.name)} />
        ))}
      </div>
    </section>
  );
};
