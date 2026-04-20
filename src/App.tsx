import { useTracking } from './hooks/useTracking';
import { Hero } from './components/Hero';
import { OfferGrid } from './components/OfferGrid';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const { trackWhatsAppClick } = useTracking();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Hero />
        <OfferGrid onAction={trackWhatsAppClick} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
