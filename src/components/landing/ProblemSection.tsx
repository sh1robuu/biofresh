import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingDown, 
  Scale, 
  EyeOff, 
  Trash2, 
  AlertCircle,
  ArrowDownRight
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      id: '01',
      title: 'Demand Uncertainty',
      description: 'Buyer requirements constantly change, making planning difficult.',
      detail: 'Last-minute volume shifts, PO cancellations, and strict retail delivery windows create perpetual scheduling chaos.',
      impactMetric: '18–24%',
      impactLabel: 'Order volatility & mismatch cost',
      icon: TrendingDown,
      color: 'amber'
    },
    {
      id: '02',
      title: 'Harvest Mismatch',
      description: 'Actual harvest quantity may differ from planned demand.',
      detail: 'Field weather, picker availability, and micro-climate variances yield unexpected deficits or uncontracted oversupply.',
      impactMetric: '12–15%',
      impactLabel: 'Harvest-to-PO volume divergence',
      icon: Scale,
      color: 'rose'
    },
    {
      id: '03',
      title: 'Quality Blind Spots',
      description: 'Quality problems are often discovered too late.',
      detail: 'Micro-bruising, core rot, and inadequate cold-chain pull-downs get discovered at the buyer intake dock, causing outright rejections.',
      impactMetric: '$72k',
      impactLabel: 'Avg buyer rejection penalty per load',
      icon: EyeOff,
      color: 'amber'
    },
    {
      id: '04',
      title: 'Surplus Waste',
      description: 'Extra production loses value without intelligent allocation.',
      detail: 'Unallocated Grade A or Grade B crops deteriorate rapidly without automated real-time secondary buyer matching and valuation.',
      impactMetric: '30%',
      impactLabel: 'Agricultural yield lost to markdown/landfill',
      icon: Trash2,
      color: 'rose'
    }
  ];

  return (
    <section id="problems" className="py-20 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Agriculture Cold-Chain Breakdown</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Fresh Supply Chains Lose Value Between Harvest and Delivery
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Perishable produce loses commercial value with every hour of delay or misallocation. Traditional spreadsheets and legacy ERPs cannot solve real-time biological volatility.
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-card hover:bg-white transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      PROBLEM {prob.id}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl ${
                        prob.color === 'rose'
                          ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-100 group-hover:bg-rose-100'
                          : 'bg-amber-50 text-amber-600 ring-1 ring-amber-100 group-hover:bg-amber-100'
                      } transition-colors`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {prob.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-700 mt-2 leading-relaxed">
                    {prob.description}
                  </p>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {prob.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-mono text-xl font-extrabold text-slate-900">
                        {prob.impactMetric}
                      </span>
                      <span className="block text-[11px] text-slate-500 font-medium">
                        {prob.impactLabel}
                      </span>
                    </div>
                    <ArrowDownRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
