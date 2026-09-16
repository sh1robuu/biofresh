import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Smartphone, 
  Boxes, 
  BrainCircuit, 
  Layers, 
  Maximize2, 
  Minimize2
} from 'lucide-react';

// Lazy-load dashboard modules for code splitting
const SalesCommandCenter = lazy(() => import('../dashboards/SalesCommandCenter').then(m => ({ default: m.SalesCommandCenter })));
const FieldOperations = lazy(() => import('../dashboards/FieldOperations').then(m => ({ default: m.FieldOperations })));
const PackhouseCenter = lazy(() => import('../dashboards/PackhouseCenter').then(m => ({ default: m.PackhouseCenter })));
const AIDecisionRoom = lazy(() => import('../dashboards/AIDecisionRoom').then(m => ({ default: m.AIDecisionRoom })));
import { RiskAlert } from '../../types';

interface ProductShowcaseProps {
  onOpenPassportModal?: () => void;
  defaultTab?: 'sales' | 'field' | 'packhouse' | 'ai';
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenPassportModal, defaultTab = 'sales' }) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'field' | 'packhouse' | 'ai'>(defaultTab);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const tabs = [
    {
      id: 'sales' as const,
      name: 'Sales Command Center',
      tag: 'Demand & Allocations',
      icon: TrendingUp,
      badge: '42 Orders',
      description: 'Buyer demand allocation, fill rate monitoring & timeline'
    },
    {
      id: 'field' as const,
      name: 'Field Operations',
      tag: 'Picker App & Supervisor',
      icon: Smartphone,
      badge: '74.8% Picked',
      description: 'Mobile picker instructions, size gauge & supervisor dispatch'
    },
    {
      id: 'packhouse' as const,
      name: 'Packhouse Command Center',
      tag: 'Batch & QC Passport',
      icon: Boxes,
      badge: '82% Grade A',
      description: 'Automated grading, continuous pre-cooling & Freshness Passport'
    },
    {
      id: 'ai' as const,
      name: 'AI Decision Room',
      tag: 'Surplus & Shortage AI',
      icon: BrainCircuit,
      badge: '35kg Surplus',
      description: 'Algorithmic valuation, 3 routing options & instant execution'
    },
  ];

  const handleResolveRiskInAI = (alert: RiskAlert) => {
    setActiveTab('ai');
  };

  return (
    <section
      id="dashboards"
      className={`py-16 transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md p-4 overflow-y-auto'
          : 'bg-white border-b border-slate-200/80 relative'
      }`}
    >
      <div className={`max-w-7xl mx-auto ${isFullscreen ? 'bg-white rounded-2xl p-6 shadow-2xl my-4' : 'px-4 sm:px-6 lg:px-8'}`}>
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Enterprise SaaS Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four Interconnected Operational Modules
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Switch between real-time operational interfaces to experience how BioFresh orchestrates demand, harvest, packhouse quality, and AI reallocation.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Workspace</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-1 ring-emerald-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {tab.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {tab.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Dashboard Container with Smooth Transition */}
        <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs min-h-[600px]">
          <Suspense fallback={
            <div className="flex items-center justify-center h-[500px]">
              <div className="text-center space-y-3">
                <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-slate-500 font-medium">Loading module...</p>
              </div>
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'sales' && (
                  <SalesCommandCenter onResolveRiskInAI={handleResolveRiskInAI} />
                )}
                {activeTab === 'field' && <FieldOperations />}
                {activeTab === 'packhouse' && <PackhouseCenter />}
                {activeTab === 'ai' && <AIDecisionRoom />}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>

      </div>
    </section>
  );
};
