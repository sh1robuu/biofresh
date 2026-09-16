import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  QrCode, 
  ShieldCheck, 
  Thermometer, 
  MapPin, 
  Clock, 
  UserCheck, 
  Award, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { BatchRecord } from '../../types';
import { Badge } from '../ui/Badge';

interface FreshnessPassportModalProps {
  batch: BatchRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FreshnessPassportModal: React.FC<FreshnessPassportModalProps> = ({
  batch,
  isOpen,
  onClose,
}) => {
  const [copiedToast, setCopiedToast] = useState(false);

  // Lock body scroll when modal is open + Escape key handler
  useEffect(() => {
    if (isOpen) {
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

  return (
    <AnimatePresence>
      {isOpen && batch && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Digital Freshness Passport"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Header with Security Seal */}
          <div className="bg-gradient-to-r from-emerald-900 via-bio-deep to-emerald-950 text-white p-6 relative">
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    FSMA 204 Verified Chain of Custody
                  </span>
                  <span className="text-xs text-emerald-200/80 font-mono">
                    ID: {batch.batchCode}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Digital Freshness Passport</span>
                  <Sparkles className="w-5 h-5 text-amber-400 inline" />
                </h2>
                <p className="text-xs text-emerald-200/90 max-w-lg">
                  Cryptographically sealed harvest record with continuous cold-chain telemetry and farm-to-buyer traceability.
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close passport modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Micro Pattern Bar */}
            <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200/90 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-300 font-semibold">{batch.product}</span>
                <span>•</span>
                <span>{batch.variety}</span>
                <span>•</span>
                <span>{batch.weight} kg Net Weight</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>LEDGER HASH: 0x9f4a...e27b</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Top Grid: QR & Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* QR Traceability Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200/80 relative group">
                  {/* Generated clean SVG QR visual */}
                  <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    {/* Position markers */}
                    <rect x="10" y="10" width="24" height="24" fill="#0f172a" rx="3" />
                    <rect x="14" y="14" width="16" height="16" fill="white" />
                    <rect x="18" y="18" width="8" height="8" fill="#047857" />

                    <rect x="66" y="10" width="24" height="24" fill="#0f172a" rx="3" />
                    <rect x="70" y="14" width="16" height="16" fill="white" />
                    <rect x="74" y="18" width="8" height="8" fill="#047857" />

                    <rect x="10" y="66" width="24" height="24" fill="#0f172a" rx="3" />
                    <rect x="14" y="70" width="16" height="16" fill="white" />
                    <rect x="18" y="74" width="8" height="8" fill="#047857" />

                    {/* QR data nodes */}
                    <rect x="40" y="12" width="6" height="6" fill="#0f172a" />
                    <rect x="50" y="12" width="8" height="4" fill="#0f172a" />
                    <rect x="42" y="24" width="12" height="6" fill="#10b981" />
                    <rect x="58" y="22" width="4" height="10" fill="#0f172a" />
                    
                    <rect x="12" y="42" width="8" height="8" fill="#0f172a" />
                    <rect x="24" y="44" width="12" height="6" fill="#0f172a" />
                    <rect x="40" y="40" width="20" height="20" fill="#064e3b" rx="2" />
                    <circle cx="50" cy="50" r="4" fill="#34d399" />

                    <rect x="64" y="42" width="6" height="10" fill="#0f172a" />
                    <rect x="74" y="46" width="14" height="6" fill="#0f172a" />
                    <rect x="40" y="66" width="8" height="12" fill="#0f172a" />
                    <rect x="52" y="74" width="10" height="6" fill="#0f172a" />
                    <rect x="68" y="66" width="14" height="8" fill="#0f172a" />
                    <rect x="72" y="78" width="16" height="8" fill="#10b981" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/0 group-hover:bg-emerald-950/10 rounded-xl transition-all cursor-pointer"></div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-900 flex items-center justify-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                    Scan for Buyer Verification
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Live link directly bound to GS1 Digital Link resolver
                  </p>
                </div>
              </div>

              {/* Harvest Metadata Dossier */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> Origin Block
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-1">
                      {batch.origin}
                    </div>
                    <div className="text-[11px] text-slate-500">{batch.fieldBlock}</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Harvest Time
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-1">
                      {batch.harvestTime}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">Within 3hr Fresh Window</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-slate-400" /> Field Lead
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-1">
                      {batch.supervisor}
                    </div>
                    <div className="text-[11px] text-slate-500">Crew #4 Lead</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <div className="text-[11px] text-slate-400 font-medium">QC Grade</div>
                    <div className="text-sm font-bold text-emerald-700 mt-0.5">
                      {batch.grade}
                    </div>
                    <div className="text-[11px] text-slate-500">Optical Laser Inspected</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <div className="text-[11px] text-slate-400 font-medium">Brix Sugar Score</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
                      {batch.brix}° Bx
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">Target exceeded (≥8.5)</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-blue-500" /> Pulp Temp
                    </div>
                    <div className="text-sm font-bold text-blue-700 mt-0.5 font-mono">
                      {batch.pulpTemp}°C
                    </div>
                    <div className="text-[11px] text-slate-500">Pre-cooling target: &lt;4°C</div>
                  </div>
                </div>

                {/* Certifications Badges */}
                <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
                  <div className="text-xs font-semibold text-emerald-900 mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-700" />
                    Verified Compliance & Standards
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {batch.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-emerald-300 text-emerald-800 shadow-2xs"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-emerald-300 text-emerald-800 shadow-2xs">
                      ✓ Pesticide Residue: Zero-Detect
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cold Chain Continuous Telemetry Graph */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-blue-600" />
                    Cold-Chain Pulldown Telemetry (°C)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Real-time BLE temperature probe logged every 30 minutes from harvest to pre-cool storage.
                  </p>
                </div>
                <Badge variant="emerald" size="sm" dot>
                  Optimal Cold Chain Maintained
                </Badge>
              </div>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={batch.coldChainData}
                    margin={{ top: 5, right: 15, left: -20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 22]}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                      unit="°"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                      formatter={(val: any) => [`${val}°C`, 'Temperature']}
                    />
                    <ReferenceLine
                      y={4.0}
                      label={{
                        value: 'Safe Cold Target (4.0°C)',
                        fill: '#059669',
                        fontSize: 10,
                        position: 'insideTopRight',
                      }}
                      stroke="#10b981"
                      strokeDasharray="3 3"
                    />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#2563eb' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chain of Custody Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Traceability Custody Chain
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                  <div className="text-[10px] text-slate-400 font-mono">STEP 01 • 06:15 AM</div>
                  <div className="font-semibold text-slate-900 mt-0.5">Field Picked</div>
                  <div className="text-[11px] text-slate-500">Sunny Valley Block 4A</div>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                  <div className="text-[10px] text-slate-400 font-mono">STEP 02 • 06:45 AM</div>
                  <div className="font-semibold text-slate-900 mt-0.5">Packhouse Intake</div>
                  <div className="text-[11px] text-slate-500">Weigh-in & QR Tagged</div>
                </div>
                <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/40">
                  <div className="text-[10px] text-emerald-700 font-mono">STEP 03 • 07:15 AM</div>
                  <div className="font-semibold text-emerald-950 mt-0.5">Optical QC Graded</div>
                  <div className="text-[11px] text-emerald-700 font-medium">Grade A Verified</div>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                  <div className="text-[10px] text-slate-400 font-mono">STEP 04 • 08:30 AM</div>
                  <div className="font-semibold text-slate-900 mt-0.5">Rapid Pre-cool</div>
                  <div className="text-[11px] text-slate-500">Holding at 3.6°C</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Signed with BioFresh Consensus Node • Tamper-evident</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `https://verify.biofresh.ag/passport/${batch.batchCode}`
                  );
                  setCopiedToast(true);
                  setTimeout(() => setCopiedToast(false), 2500);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copiedToast ? 'Copied!' : 'Share Passport URL'}
              </button>

              <button
                onClick={() => window.print()}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Certificate
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
