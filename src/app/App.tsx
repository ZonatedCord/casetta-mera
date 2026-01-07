import { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhySection } from './components/WhySection';
import { PerfectForSection } from './components/PerfectForSection';
import { StatsSection } from './components/StatsSection';
import { GallerySection } from './components/GallerySection';
import { ServicesSection } from './components/ServicesSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { AvailabilitySection } from './components/AvailabilitySection';
import { HouseRulesFAQSection } from './components/HouseRulesFAQSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { QuoteFormModal } from './components/QuoteFormModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { BackToTop } from './components/BackToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider } from './context/LanguageContext';
import { it } from './translations/it';
import { en } from './translations/en';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { FaqPage } from './pages/FaqPage';
import { AdminApp } from './admin/AdminApp';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    if (pathname !== '/') {
      window.location.href = '/';
      return;
    }

    setCurrentSection(section);
    
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      home: homeRef,
      services: servicesRef,
      activities: activitiesRef,
      availability: availabilityRef,
      contacts: contactsRef,
    };

    const ref = refs[section];
    if (ref?.current) {
      const offset = 80; // navbar height
      const top = ref.current.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const legalPages: Record<string, JSX.Element> = {
    '/termini-e-condizioni': <TermsPage />,
    '/privacy-policy': <PrivacyPage />,
    '/faq': <FaqPage />,
  };

  const legalPage = legalPages[pathname];

  if (pathname.startsWith('/admin')) {
    return <AdminApp pathname={pathname} onNavigate={setPathname} />;
  }

  return (
    <LanguageProvider translations={{ it, en }}>
      <div className="min-h-screen bg-white pb-20 md:pb-0">
        {/* Navbar */}
        <Navbar onNavigate={handleNavigate} currentSection={currentSection} />

        {legalPage ? (
          <>
            {legalPage}
            <Footer />
            <WhatsAppButton />
          </>
        ) : (
          <>
            {/* Hero Section */}
            <div ref={homeRef}>
              <Hero
                onNavigateToAvailability={() => handleNavigate('availability')}
                onOpenQuoteForm={() => setIsQuoteModalOpen(true)}
              />
            </div>

            {/* Why Section */}
            <WhySection />

            {/* Perfect For Section - NEW */}
            <PerfectForSection />

            {/* Stats Section */}
            <StatsSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* Services Section */}
            <div ref={servicesRef}>
              <ServicesSection />
            </div>

            {/* Activities Section */}
            <div ref={activitiesRef}>
              <ActivitiesSection />
            </div>

            {/* Availability Section */}
            <div ref={availabilityRef}>
              <AvailabilitySection />
            </div>

            {/* House Rules & FAQ Section - NEW */}
            <HouseRulesFAQSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Map Section */}
            <div ref={contactsRef}>
              <MapSection />
            </div>

            {/* Footer */}
            <Footer />

            {/* Quote Form Modal */}
            <QuoteFormModal
              isOpen={isQuoteModalOpen}
              onClose={() => setIsQuoteModalOpen(false)}
            />

            {/* Mobile Bottom Bar */}
            <MobileBottomBar
              onNavigateToAvailability={() => handleNavigate('availability')}
              onOpenQuoteForm={() => setIsQuoteModalOpen(true)}
            />

            {/* Back to Top Button */}
            <BackToTop />

            {/* WhatsApp Button */}
            <WhatsAppButton />

            {/* Toast Notifications */}
            <Toaster />
          </>
        )}
      </div>
    </LanguageProvider>
  );
}
