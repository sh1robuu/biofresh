import React from 'react';
import { ArrowRight, Sparkles, Mail, CheckCircle2 } from 'lucide-react';

interface FinalCTAProps {
  onStartDemo: () => void;
  onContactBioFresh: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartDemo, onContactBioFresh }) => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-bio-deep to-emerald-900 text-white p-8 sm:p-14 lg:p-16 shadow-2xl border border-emerald-800 overflow-hidden text-center md:text-left">
          {/* Subtle Background Mesh */}
          <div className="absolute inset-0 bg-dot-mesh opacity-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Modern AgTech Decision Intelligence</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Make Every Batch More Valuable
              </h2>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
                Connect your buyers, harvest crews, and packhouse operations to an autonomous decision engine that protects fresh margins.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200 justify-center md:justify-start">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  FSMA 204 Ready
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ERP & Sensor Integration
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  14-Day Pilot Sandbox
                </span>
              </div>
            </div>

            {/* Buttons Required by Prompt: Start Demo & Contact BioFresh */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3.5 justify-center">
              <button
                onClick={onStartDemo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <span>Start Demo</span>
                <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onContactBioFresh}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-sm border border-emerald-600/60 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>Contact BioFresh</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
