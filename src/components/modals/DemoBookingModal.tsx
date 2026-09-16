import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Calculator, ArrowRight, Building2, Mail, User } from 'lucide-react';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [tonsPerYear, setTonsPerYear] = useState<number>(3500);
  const [cropType, setCropType] = useState<string>('Berries & Soft Fruit');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    role: 'Supply Chain VP / Director',
  });

  // Reset form state when modal closes and reopens + Escape key
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Estimated economic salvage with BioFresh
  const estimatedAnnualSavings = Math.round(tonsPerYear * 285);
  const estimatedWasteDivertedTons = Math.round(tonsPerYear * 0.18);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Schedule BioFresh Architecture Briefing"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 to-bio-deep text-white p-6 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Enterprise Pilot Program
                </div>
                <h3 className="text-xl font-bold text-white">
                  Schedule BioFresh Architecture Briefing
                </h3>
                <p className="text-xs text-emerald-200/90 mt-1 max-w-md">
                  Experience how leading agricultural shippers and commercial packers eliminate produce shrinkage and maximize contract fulfillment.
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close demo booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Demo Sandbox Access Reserved
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you! Our agricultural logistics engineering team has received your profile. We've sent an interactive sandbox link and calendar invite to <span className="font-semibold text-slate-900">{formData.email || 'your email'}</span>.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-left text-xs space-y-1">
                  <div className="font-semibold text-slate-700">Projected Pilot Savings:</div>
                  <div className="text-emerald-700 font-mono font-bold text-base">
                    ${estimatedAnnualSavings.toLocaleString()} / year
                  </div>
                  <div className="text-slate-500">
                    Based on {tonsPerYear.toLocaleString()} tons/yr of {cropType}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors"
                >
                  Return to Platform
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Dynamic ROI Quick Calculator */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-emerald-700" />
                      Instant Value Projection Calculator
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      ${estimatedAnnualSavings.toLocaleString()} Projected Salvage
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">
                        Crop Category
                      </label>
                      <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option>Berries & Soft Fruit</option>
                        <option>Avocados & Tree Fruit</option>
                        <option>Leafy Greens & Brassicas</option>
                        <option>Vine Tomatoes & Peppers</option>
                        <option>Citrus & Subtropical</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-slate-600 font-medium">Annual Harvest Volume</label>
                        <span className="font-mono font-semibold text-slate-800">{tonsPerYear.toLocaleString()} tons</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="25000"
                        step="500"
                        value={tonsPerYear}
                        onChange={(e) => setTonsPerYear(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-emerald-800 pt-1 border-t border-emerald-200/60">
                    <span>⚡ Diverts ~<strong>{estimatedWasteDivertedTons} tons</strong> from food waste</span>
                    <span>•</span>
                    <span>📈 +14.8% average gross margin recovery</span>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="s.jenkins@agrigroup.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Enterprise / Farm Organization *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Valley Crest Agricultural Holdings"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Primary Operational Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
                    >
                      <option>Supply Chain VP / Director</option>
                      <option>Packhouse General Manager</option>
                      <option>Commercial Sales & Allocation Lead</option>
                      <option>Farm Operations Director</option>
                      <option>Agritech Investor / Partner</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">
                    Enterprise SLA • FSMA 204 Compliant • SOC 2 Type II Certified
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md shadow-emerald-900/10 transition-all cursor-pointer"
                  >
                    <span>Request Technical Walkthrough</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
