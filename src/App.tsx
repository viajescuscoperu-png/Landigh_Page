import { useTracking } from './hooks/useTracking';
import { Hero } from './components/Hero';
import { OfferGrid } from './components/OfferGrid';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function App() {
  const { trackWhatsAppClick } = useTracking();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-10 max-w-7xl">
          <Hero />
          <OfferGrid onAction={trackWhatsAppClick} />
        </div>
        <Testimonials />
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <Faq />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
