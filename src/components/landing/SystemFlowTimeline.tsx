import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSpreadsheet, 
  Users, 
  Boxes, 
  QrCode, 
  Scale, 
  BrainCircuit, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const SystemFlowTimeline: React.FC<{ onOpenPassportModal?: () => void }> = ({ onOpenPassportModal }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Order & Buyer Specification Management',
      subtitle: 'Advance Demand Synchronization',
      description: 'Capture buyer orders 24–48 hours before harvest and translate requirements into clear harvest specifications.',
      icon: FileSpreadsheet,
      badge: '24–48h Advance Lock',
      payload: {
        buyer: 'FreshMart Supermarket • Tier 1 PO',
        spec: 'Albion Strawberry • Min 85% Blush • 28–32mm Caliber',
        volume: '350 kg required • Target Dock Time: 14:00 Today',
        tolerance: 'Zero tolerance for bruised or moldy calyx'
      }
    },
    {
      stepNumber: '02',
      title: 'Field Harvest Coordination',
      subtitle: 'Dynamic In-Field Dispatch',
      description: 'Assign pickers, monitor harvest progress and detect shortages.',
      icon: Users,
      badge: 'Real-Time BLE Mesh',
      payload: {
        crew: 'Sector 4A & 4B • 28 Active Pickers',
        instruction: 'Pick Grade A only • Leave 1cm stem attached',
        weighIn: 'Live NFC crate logging • 3,740 kg gathered (74.8%)',
        alert: 'Micro-bruising early warning broadcast to row 14'
      }
    },
    {
      stepNumber: '03',
      title: 'Packhouse & Batch Tracking',
      subtitle: 'Continuous Telemetry & Optical QC',
      description: 'Record actual quantity, quality grading and batch history.',
      icon: Boxes,
      badge: 'Automated Laser QC',
      payload: {
        batchId: 'BATCH-2026-SB-094 • 1,240 kg Net',
        grading: '82% Grade A • 12% Grade B • 4% Processing • 2% Reject',
        pulpTemp: 'Pulldown curve holding at 3.6°C (Target <4.0°C)',
        sugarBrix: 'Refractometer Score: 8.9° Bx'
      }
    },
    {
      stepNumber: '04',
      title: 'Freshness Passport',
      subtitle: 'Digital Provenance Certificate',
      description: 'Create a digital record for each batch from harvest to delivery.',
      icon: QrCode,
      badge: 'FSMA 204 Cryptographic Seal',
      isPassportAction: true,
      payload: {
        seal: 'Consensus Ledger Hash: 0x9f4a...e27b',
        coldChain: 'Continuous 30-min BLE logger profile attached',
        origin: 'Sunny Valley Block 4A • GPS 36.6777° N, 121.6555° W',
        access: 'Scannable dynamic QR for dock receipt verification'
      }
    },
    {
      stepNumber: '05',
      title: 'Order Reconciliation & Exception Management',
      subtitle: 'Automated Discrepancy Resolution',
      description: 'Compare actual delivery with orders and manage shortage, surplus or rejection.',
      icon: Scale,
      badge: 'Tolerance Engine',
      payload: {
        demandVsActual: 'Demand: 4,850 kg vs Harvest: 4,620 kg (95.3%)',
        deviation: 'Metro Fresh Avocado: -120 kg deficit detected',
        surplus: 'Packhouse 2 Strawberry: +35 kg unallocated surplus',
        status: 'Triggered immediate AI Reallocation Rule #4'
      }
    },
    {
      stepNumber: '06',
      title: 'AI Demand & Surplus Decision Engine',
      subtitle: 'Algorithmic Commercial Optimization',
      description: 'Analyze demand signals, inventory, freshness and economics to recommend the best action.',
      icon: BrainCircuit,
      badge: 'Autonomous Valuation',
      payload: {
        evaluation: 'Synthesized 3 routing pathways in 340ms',
        winner: 'Option 2: Artisan Bakery Network ($410 recovered)',
        confidence: '96% confidence score • 100% zero-landfill diversion',
        action: 'Automated Bill of Lading & secondary dispatch issued'
      }
    }
  ];

  const currentStepData = steps[activeStep];

  return (
    <section id="system-flow" className="py-20 bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The BioFresh System Flow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Harvest to Buyer in One Continuous Intelligent Stream
          </h2>

          <p className="text-base text-slate-600 mt-2 leading-relaxed">
            Every step is connected through a unified data fabric, transforming opaque agricultural handoffs into automated decision intelligence.
          </p>
        </div>

        {/* Step Navigation Bar / Progress Pills */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={s.stepNumber}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span className={`font-mono text-[11px] ${isActive ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {s.stepNumber}
                  </span>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[130px] sm:max-w-none">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Flow Container: Cards with Progressive Scroll Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Active Step Deep Detail Card (Left 7 cols) */}
          <motion.div
            key={currentStepData.stepNumber}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  STEP {currentStepData.stepNumber} OF 06
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {currentStepData.badge}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {currentStepData.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {currentStepData.title}
                </h3>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Data Payload Demonstration */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 mt-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Operational Telemetry Payload</span>
                  <span className="font-mono text-emerald-700 font-semibold">JSON • Live Synchronized</span>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  {Object.entries(currentStepData.payload).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                      <span className="text-slate-400 uppercase text-[10px] w-24 shrink-0 font-sans font-semibold">
                        {key}:
                      </span>
                      <span className="text-slate-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Step Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-400 ml-2 font-mono">
                  {activeStep + 1} / 6
                </span>
              </div>

              {currentStepData.isPassportAction && onOpenPassportModal && (
                <button
                  onClick={onOpenPassportModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Launch Passport Inspector</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* All 6 Steps Mini Overview Rail (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-1 ring-emerald-400/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isActive
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.stepNumber}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${isActive ? 'text-emerald-950' : 'text-slate-800'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-emerald-700 translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
