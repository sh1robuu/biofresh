import React from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Capture Data',
      subtitle: 'Continuous Multi-Source Ingestion',
      description: 'Collect operational data from across the farm and commercial network in real time.',
      items: [
        'Buyer orders & contractual SLAs',
        'Harvest field coordinates & picker weigh-ins',
        'Cold-room inventory & pre-cooling probes',
        'Optical laser quality & Brix refractometer data'
      ],
      icon: Database,
      badge: 'Real-time Ingestion',
      color: 'emerald'
    },
    {
      step: '02',
      title: 'Generate Intelligence',
      subtitle: 'Multi-Variable Machine Optimization',
      description: 'The BioFresh decision layer analyzes live biological and commercial streams.',
      items: [
        'Demand coverage & shortage probability',
        'Freshness decay curve & shelf-life degradation',
        'Cold-chain breach & rejection risk',
        'Dynamic salvage economics & buyer routing match'
      ],
      icon: BrainCircuit,
      badge: '340ms Decision Cycle',
      color: 'amber'
    },
    {
      step: '03',
      title: 'Execute Decisions',
      subtitle: 'Closed-Loop Actionable Routing',
      description: 'Operational teams receive clear, high-conviction instructions with one-click dispatch.',
      items: [
        'Push revised instructions to picker mobile terminals',
        'Reallocate unassigned surplus to highest-margin buyers',
        'Automate FSMA 204 Freshness Passports with QR',
        'Pre-clear dock intake windows with proof of quality'
      ],
      icon: CheckCircle2,
      badge: 'Instant Execution',
      color: 'emerald'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Architecture & Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How BioFresh Transforms Fresh Produce Operations
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Three simple layers that convert perishable biological reality into predictable enterprise performance.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="bg-slate-50/70 rounded-2xl p-7 border border-slate-200 hover:border-emerald-300 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-emerald-800">
                      STEP {step.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-emerald-700 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {step.subtitle}
                  </span>

                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-200/80 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Key Capabilities:
                    </div>
                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-mono text-emerald-800 font-semibold flex items-center justify-between">
                  <span>{step.badge}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
