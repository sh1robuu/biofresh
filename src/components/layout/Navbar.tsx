import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  LayoutDashboard, 
  QrCode
} from 'lucide-react';

interface NavbarProps {
  onOpenDemoModal: () => void;
  onOpenPassportModal?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDemoModal,
  onOpenPassportModal,
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              {/* BioFresh Insignia */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-bio-deep flex items-center justify-center shadow-xs border border-emerald-700/50 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3C8 3 5 7 5 11c0 4 3 8 7 8 1.2 0 2.4-.4 3.4-1.2-2.4-1.6-4.4-3.6-5.4-6.8.6-1.2 1.6-2 2.8-2.6.6-1.2 1.6-2.4 3.2-3.4A9 9 0 0 0 12 3z"
                    fill="#34d399"
                  />
                  <circle cx="16.5" cy="7.5" r="2" fill="#f59e0b" />
                  <circle cx="18" cy="14" r="1.5" fill="#10b981" />
                </svg>
              </div>

              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                BioFresh
              </span>
            </a>

            {/* Live Mesh Status Badge */}
            <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-200 text-[11px] text-slate-600 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400">Mesh:</span>
              <span className="font-semibold text-emerald-700">Active (4,850 kg Synced)</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => handleNavClick('problems')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              The Challenge
            </button>
            <button
              onClick={() => handleNavClick('system-flow')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              System Flow
            </button>
            <button
              onClick={() => handleNavClick('dashboards')}
              className="hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Live Dashboards</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('impact')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Impact ROI
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenPassportModal && (
              <button
                onClick={onOpenPassportModal}
                className="p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-slate-100 transition-colors"
                title="Inspect Freshness Passport"
              >
                <QrCode className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => handleNavClick('dashboards')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700" />
              <span>Launch App</span>
            </button>

            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <span>Request Pilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('problems')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              The Challenge
            </button>
            <button
              onClick={() => handleNavClick('system-flow')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              System Flow
            </button>
            <button
              onClick={() => handleNavClick('dashboards')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Operational Dashboards</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                4 Modules
              </span>
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('impact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Impact ROI
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('dashboards');
              }}
              className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-700" />
              <span>Open Operational Command Centers</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Schedule Architecture Briefing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
