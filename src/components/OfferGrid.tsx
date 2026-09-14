import { TourCard } from './TourCard';
import { useLanguage } from '../context/LanguageContext';
import { useAudience } from '../context/AudienceContext';
import { useTours } from '../hooks/useTours';

interface OfferGridProps {
  onAction: (tourName: string) => void;
}

export const OfferGrid = ({ onAction }: OfferGridProps) => {
  const { langText } = useLanguage();
  const { audience, setAudience } = useAudience();
  const { tours } = useTours();

  const visibleTours = tours.filter((tour) => tour.audience === 'both' || tour.audience === audience);

  return (
    <section className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-brand-dark mb-2">{langText('offer_title_1')} <span className="text-brand-orange">{langText('offer_title_2')}</span></h2>
        <p className="text-slate-500">{langText('offer_subtitle')}</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200">
          <button
            onClick={() => setAudience('foreign')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all ${
              audience === 'foreign' ? 'bg-brand-orange text-white font-bold shadow-sm' : 'text-slate-500 hover:text-brand-dark font-medium'
            }`}
          >
            <span className="text-base leading-none">🌎</span>
            {langText('audience_foreign')}
          </button>
          <button
            onClick={() => setAudience('national')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all ${
              audience === 'national' ? 'bg-brand-orange text-white font-bold shadow-sm' : 'text-slate-500 hover:text-brand-dark font-medium'
            }`}
          >
            <span className="text-base leading-none">🇵🇪</span>
            {langText('audience_national')}
          </button>
        </div>
      </div>

      {visibleTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onAction={() => onAction(tour.name)} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400 py-10">{langText('offer_empty_audience')}</p>
      )}
    </section>
  );
};
