import React from 'react';
import { ShieldCheck, Award, CheckCircle2, QrCode } from 'lucide-react';

export const Footer: React.FC<{ onOpenPassportModal?: () => void }> = ({ onOpenPassportModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Positioning (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center border border-emerald-500/30">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3C8 3 5 7 5 11c0 4 3 8 7 8 1.2 0 2.4-.4 3.4-1.2-2.4-1.6-4.4-3.6-5.4-6.8.6-1.2 1.6-2 2.8-2.6.6-1.2 1.6-2.4 3.2-3.4A9 9 0 0 0 12 3z"
                    fill="#34d399"
                  />
                  <circle cx="16.5" cy="7.5" r="2" fill="#f59e0b" />
                </svg>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">
                BioFresh
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The Decision Intelligence Layer for Fresh Agriculture Supply Chain. Connecting buyers, farms, packhouses and AI recommendations in one real-time flow.
            </p>

            <div className="pt-2 text-slate-300 font-medium">
              "From harvest to buyer, every batch becomes traceable data and every decision becomes optimized."
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-mono text-emerald-400">
                Platform Mesh SLA: 99.98% • US-West & LatAm Clusters
              </span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#dashboards" className="hover:text-white transition-colors">Sales Command Center</a></li>
              <li><a href="#dashboards" className="hover:text-white transition-colors">Field Operations Mobile</a></li>
              <li><a href="#dashboards" className="hover:text-white transition-colors">Packhouse Batch Center</a></li>
              <li><a href="#dashboards" className="hover:text-white transition-colors">AI Decision Room</a></li>
              <li>
                <button
                  onClick={onOpenPassportModal}
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Freshness Passport</span>
                  <QrCode className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Agricultural ERP Integrations */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Ecosystem Integrations
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>SAP S/4HANA Supply Chain</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>John Deere Operations Center</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Oracle NetSuite Agribusiness</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Samsara IoT Reefer Telemetry</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>GS1 Digital Link Resolvers</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Certifications */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Compliance & Security
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-white font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  FSMA 204 Traceability Rule
                </div>
                <p className="text-[11px] text-slate-500">
                  Automated Critical Tracking Events (CTEs) & Key Data Elements (KDEs).
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-white font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  GlobalG.A.P. IFA v6
                </div>
                <p className="text-[11px] text-slate-500">
                  Pre-harvest compliance and chemical residue ledger audit trail.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 BioFresh Inc. All rights reserved. Decision Intelligence Layer for Fresh Agriculture.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security & Trust</a>
            <a href="#" className="hover:text-slate-400 transition-colors">API Documentation</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Status Grid</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
