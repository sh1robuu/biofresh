import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { ProblemSection } from './components/landing/ProblemSection';
import { SystemFlowTimeline } from './components/landing/SystemFlowTimeline';
import { ProductShowcase } from './components/landing/ProductShowcase';
import { HowItWorks } from './components/landing/HowItWorks';
import { ImpactMetrics } from './components/landing/ImpactMetrics';
import { FinalCTA } from './components/landing/FinalCTA';
import { FreshnessPassportModal } from './components/modals/FreshnessPassportModal';
import { DemoBookingModal } from './components/modals/DemoBookingModal';
import { mockBatches } from './data/mockData';
import { BatchRecord } from './types';

export function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState<boolean>(false);
  const [activePassportBatch, setActivePassportBatch] = useState<BatchRecord>(mockBatches[0]);

  const handleOpenPassport = (batch?: BatchRecord) => {
    if (batch) {
      setActivePassportBatch(batch);
    } else {
      setActivePassportBatch(mockBatches[0]);
    }
    setIsPassportModalOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Sticky Enterprise Header */}
      <Navbar
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenPassportModal={() => handleOpenPassport()}
        onNavigateToSection={handleScrollTo}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExplorePlatform={() => handleScrollTo('system-flow')}
          onViewDashboard={() => handleScrollTo('dashboards')}
          onOpenPassportModal={() => handleOpenPassport()}
        />

        {/* 2. Problem Section */}
        <ProblemSection />

        {/* 3. BioFresh System Flow Timeline */}
        <SystemFlowTimeline
          onOpenPassportModal={() => handleOpenPassport()}
        />

        {/* 4, 5, 6, 7. Interactive Product Dashboards Experience */}
        <ProductShowcase
          onOpenPassportModal={() => handleOpenPassport()}
        />

        {/* 8. How It Works Section */}
        <HowItWorks />

        {/* 9. Impact Metrics */}
        <ImpactMetrics />

        {/* 10. Final CTA */}
        <FinalCTA
          onStartDemo={() => setIsDemoModalOpen(true)}
          onContactBioFresh={() => setIsDemoModalOpen(true)}
        />
      </main>

      {/* Enterprise Footer */}
      <Footer
        onOpenPassportModal={() => handleOpenPassport()}
      />

      {/* Global Interactive Modals */}
      <FreshnessPassportModal
        batch={activePassportBatch}
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
      />

      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;
