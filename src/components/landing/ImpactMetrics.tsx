import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, ShieldCheck, Leaf, DollarSign, Zap } from 'lucide-react';

export const ImpactMetrics: React.FC = () => {
  const metrics = [
    {
      value: '98%',
      label: 'Order fulfillment visibility',
      description: 'End-to-end line-item tracking from field harvest to retail intake dock.',
      icon: TrendingUp,
      accent: 'text-emerald-700'
    },
    {
      value: '24–48h',
      label: 'Advance buyer planning',
      description: 'Pre-harvest demand matching prevents last-minute dispatch scrambling.',
      icon: Clock,
      accent: 'text-slate-900'
    },
    {
      value: '100%',
      label: 'Batch traceability',
      description: 'Cryptographically sealed digital Freshness Passports under FSMA 204.',
      icon: ShieldCheck,
      accent: 'text-emerald-700'
    },
    {
      value: '30%',
      label: 'Potential waste reduction',
      description: 'Dynamic AI re-routing redirects excess perishable crops to secondary channels.',
      icon: Leaf,
      accent: 'text-amber-700'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proven Enterprise ROI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quantifiable Impact Across the Fresh Value Chain
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Measuring every crate, temperature log, and commercial transaction gives agriculture leaders unmatched operational control.
          </p>
        </div>

        {/* 4 Animated KPI Counters Required by Prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle hover:border-emerald-300 hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/80">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                      BENCHMARK
                    </span>
                  </div>

                  <div className={`font-mono text-4xl sm:text-5xl font-extrabold tracking-tight ${metric.accent}`}>
                    {metric.value}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {metric.label}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <span>✓ Verified Enterprise Impact</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-950 text-white border border-emerald-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              Seasonal Industry Metric
            </div>
            <div className="text-2xl font-bold text-white">
              $1.4M Average Annual Produce Loss Prevented
            </div>
            <p className="text-xs text-emerald-200/80 max-w-xl">
              Based on mid-size commercial berry and tree-fruit packing operations packing 10,000+ tons annually.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono">
            <div className="text-center px-4 py-2 rounded-xl bg-white/10 border border-white/10">
              <span className="block text-2xl font-bold text-emerald-300">4.2x</span>
              <span className="text-[10px] uppercase text-emerald-200">Faster Reconciliation</span>
            </div>
            <div className="text-center px-4 py-2 rounded-xl bg-white/10 border border-white/10">
              <span className="block text-2xl font-bold text-amber-300">0</span>
              <span className="text-[10px] uppercase text-amber-200">FSMA Audit Gaps</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
