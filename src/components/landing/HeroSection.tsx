import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  Activity, 
  Sprout,
  BarChart3
} from 'lucide-react';

interface HeroSectionProps {
  onExplorePlatform: () => void;
  onViewDashboard: () => void;
  onOpenPassportModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePlatform,
  onViewDashboard,
  onOpenPassportModal,
}) => {
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'flow' | 'telemetry' | 'allocation'>('flow');

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Background Gradients & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Storytelling, Headline, Subtitle, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-900 tracking-tight flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                Decision Intelligence Layer for Fresh Agriculture
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Turning Fresh Produce Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-bio-deep to-emerald-600">
                Intelligent Decisions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              An end-to-end decision intelligence platform connecting buyers, farms, packhouses and AI recommendations in one real-time flow.
            </p>

            {/* Core Message Callout */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5 max-w-lg shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-snug">
                <strong className="text-slate-900 font-semibold">Our core promise:</strong> "From harvest to buyer, every batch becomes traceable data and every decision becomes optimized."
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onExplorePlatform}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-900/15 hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onViewDashboard}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-2xs hover:border-slate-400 transition-all cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <span>View Live Dashboard</span>
              </button>
            </div>

            {/* Enterprise Trust Stats */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-mono font-bold text-xl text-slate-900">98%</div>
                <div className="text-xs text-slate-500 mt-0.5">Order Visibility</div>
              </div>
              <div>
                <div className="font-mono font-bold text-xl text-slate-900">24–48h</div>
                <div className="text-xs text-slate-500 mt-0.5">Advance Planning</div>
              </div>
              <div>
                <div className="font-mono font-bold text-xl text-emerald-700">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Batch Traceability</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive SaaS Dashboard Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000"></div>

            {/* Main Interactive SaaS Frame */}
            <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden">
              {/* App Titlebar */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    biofresh.network/live-mesh
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    MESH ONLINE
                  </span>
                </div>
              </div>

              {/* Sub-header with Tab Switcher */}
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 font-semibold text-slate-700">
                  <Activity className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Real-Time Supply Chain Overview</span>
                </div>

                <div className="flex items-center bg-white rounded-md border border-slate-200 p-0.5 text-[11px]">
                  <button
                    onClick={() => setActiveInteractiveTab('flow')}
                    className={`px-2 py-0.5 rounded transition-all ${
                      activeInteractiveTab === 'flow'
                        ? 'bg-emerald-700 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Flow View
                  </button>
                  <button
                    onClick={() => setActiveInteractiveTab('telemetry')}
                    className={`px-2 py-0.5 rounded transition-all ${
                      activeInteractiveTab === 'telemetry'
                        ? 'bg-emerald-700 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Cold-Chain
                  </button>
                  <button
                    onClick={() => setActiveInteractiveTab('allocation')}
                    className={`px-2 py-0.5 rounded transition-all ${
                      activeInteractiveTab === 'allocation'
                        ? 'bg-emerald-700 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    AI Surplus
                  </button>
                </div>
              </div>

              {/* Interactive Preview Canvas */}
              <div className="p-4 sm:p-5 space-y-4">
                {activeInteractiveTab === 'flow' && (
                  <div className="space-y-3.5">
                    {/* Live Batch Highlight */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                          SB
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-slate-900">
                              BATCH-2026-SB-094
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              Grade A (82%)
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Sunny Valley Block 4A • 1,240 kg Albion Strawberry
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-xs font-bold text-blue-700">3.6°C Pulp</div>
                        <div className="text-[10px] text-emerald-700 font-semibold">QC Passed</div>
                      </div>
                    </div>

                    {/* Mini Flow Nodes */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                        <div className="text-[10px] text-slate-400 font-mono">01. DEMAND</div>
                        <div className="font-bold text-slate-800 mt-0.5">350 kg</div>
                        <div className="text-[10px] text-slate-500">FreshMart Supermarket</div>
                      </div>
                      <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50">
                        <div className="text-[10px] text-emerald-700 font-mono">02. HARVEST</div>
                        <div className="font-bold text-emerald-950 mt-0.5">100% Picked</div>
                        <div className="text-[10px] text-emerald-700">Brix 8.9° Target Met</div>
                      </div>
                      <div className="p-2.5 rounded-lg border border-amber-300 bg-amber-50/60">
                        <div className="text-[10px] text-amber-800 font-mono">03. AI ENGINE</div>
                        <div className="font-bold text-amber-950 mt-0.5">+35 kg Surplus</div>
                        <div className="text-[10px] text-amber-800 font-bold">Auto-Routed +$410</div>
                      </div>
                    </div>

                    {/* Real-time Order Allocation Snippet */}
                    <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-700 font-semibold">
                        <span>Daily Fulfillment Coverage</span>
                        <span className="font-mono text-emerald-700 font-bold">4,620 / 4,850 kg (95.3%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '95.3%' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeInteractiveTab === 'telemetry' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-900">Cold Chain Pulldown Telemetry</span>
                        <span className="font-mono text-blue-700 font-bold">Holding at 3.6°C</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Intake at 16.2°C → Pulled down to target 3.6°C within 1h 45m.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                        <span className="text-[10px] text-slate-400 block">Firmness Pressure</span>
                        <strong className="text-slate-900 text-sm font-mono">4.8 kg/cm²</strong>
                        <span className="text-[10px] text-emerald-600 block">No micro-bruising</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                        <span className="text-[10px] text-slate-400 block">Shelf-Life Index</span>
                        <strong className="text-emerald-700 text-sm font-mono">7 Days</strong>
                        <span className="text-[10px] text-slate-500 block">Grade A Retained</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeInteractiveTab === 'allocation' && (
                  <div className="p-3.5 bg-amber-50/70 border border-amber-300 rounded-xl text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        AI Surplus Recommendation Triggered
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                        96% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-amber-900 leading-snug">
                      Detected 35kg surplus strawberry. Matched to <strong>Artisan Bakery Network</strong> with same-day dispatch (+$410 recovered).
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-amber-800">
                      <span>Zero landfill conversion</span>
                      <span className="font-semibold underline cursor-pointer" onClick={onViewDashboard}>
                        Inspect in Decision Room →
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom Interactive Bar */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>FSMA 204 Digital Freshness Passport Attached</span>
                  </div>

                  <button
                    onClick={onOpenPassportModal}
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR Passport</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
