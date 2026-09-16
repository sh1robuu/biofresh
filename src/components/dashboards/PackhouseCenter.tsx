import React, { useState } from 'react';
import { 
  Boxes, 
  QrCode, 
  Thermometer, 
  Scale, 
  Search, 
  Award, 
  Clock, 
  MapPin, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { FreshnessPassportModal } from '../modals/FreshnessPassportModal';
import { mockBatches, mockQCSummary } from '../../data/mockData';
import { BatchRecord } from '../../types';

export const PackhouseCenter: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null);
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredBatches = mockBatches.filter((batch) => {
    const matchesSearch =
      batch.batchCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
      batch.product.toLowerCase().includes(searchFilter.toLowerCase()) ||
      batch.origin.toLowerCase().includes(searchFilter.toLowerCase());

    if (gradeFilter === 'All') return matchesSearch;
    return matchesSearch && batch.grade === gradeFilter;
  });

  const handleOpenPassport = (batch: BatchRecord) => {
    setSelectedBatch(batch);
    setIsPassportOpen(true);
  };

  const getGradeBadge = (grade: BatchRecord['grade']) => {
    switch (grade) {
      case 'Grade A':
        return <Badge variant="emerald" dot>Grade A</Badge>;
      case 'Grade B':
        return <Badge variant="amber" dot>Grade B</Badge>;
      case 'Processing':
        return <Badge variant="blue">Processing</Badge>;
      case 'Reject':
        return <Badge variant="rose">Reject</Badge>;
    }
  };

  const getStatusBadge = (status: BatchRecord['status']) => {
    switch (status) {
      case 'QC Passed':
        return <Badge variant="emerald" size="sm">QC Passed</Badge>;
      case 'Pre-cooling':
        return <Badge variant="blue" size="sm" dot>Pre-cooling</Badge>;
      case 'Dispatch Ready':
        return <Badge variant="emerald" size="sm">Dispatch Ready</Badge>;
      case 'Graded':
        return <Badge variant="slate" size="sm">Graded</Badge>;
      default:
        return <Badge variant="slate" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
              Packhouse Central Hub • Intake & Inspection
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Packhouse Command Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated optical grading, continuous pre-cooling telemetry, and digital Freshness Passport generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenPassport(mockBatches[0])}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Sample Freshness Passport</span>
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          label="Batches In Process"
          value="18 Batches"
          subtext="4 awaiting optical QC"
          icon={Boxes}
          variant="default"
        />
        <MetricCard
          label="Grade A Yield"
          value="82.4%"
          subtext="Premium target: ≥80%"
          change="+3.1% vs last week"
          trend="up"
          icon={Award}
          variant="emerald"
        />
        <MetricCard
          label="Avg Pre-Cool Temp"
          value="3.6°C"
          subtext="Within optimal envelope"
          icon={Thermometer}
          variant="emerald"
        />
        <MetricCard
          label="FSMA 204 Traceability"
          value="100%"
          subtext="Sealed on ledger"
          badge="Audit Ready"
          icon={ShieldCheck}
          variant="default"
        />
      </div>

      {/* QC Grading Breakdown Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Quality Control (QC) Grading Distribution</span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                3,740 kg Inspected Today
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              High-speed optical laser scan measuring skin blemish, caliber diameter, firmness, and Brix refractor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Recharts Donut Pie Chart (5 columns) */}
          <div className="lg:col-span-5 h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockQCSummary}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {mockQCSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(value: any, name: any) => [`${value}% of total intake`, String(name)]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-slate-700 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 4 QC Breakdown Cards (7 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockQCSummary.map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    {item.name}
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {item.value}%
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-mono font-semibold text-slate-700">{item.count}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Batch Tracking Cards Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Live Batch Tracking Registry
            </h3>
            <p className="text-xs text-slate-500">
              Select any batch to inspect sensor telemetry or generate its client-facing Freshness Passport.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter batch ID or crop..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 text-slate-800 w-44"
              />
            </div>

            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
              {['All', 'Grade A', 'Grade B'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setGradeFilter(grade)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    gradeFilter === grade
                      ? 'bg-emerald-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Batch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle hover:border-emerald-300 hover:shadow-card transition-all duration-200 space-y-4"
            >
              {/* Card Top */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {batch.batchCode}
                    </span>
                    {getStatusBadge(batch.status)}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {batch.product} <span className="text-xs font-normal text-slate-500 font-sans">({batch.variety})</span>
                  </h4>
                </div>
                {getGradeBadge(batch.grade)}
              </div>

              {/* Batch Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-2.5 border-y border-slate-100 text-xs">
                <div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> Origin
                  </div>
                  <div className="font-semibold text-slate-800 truncate mt-0.5">
                    {batch.origin}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{batch.fieldBlock}</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> Harvest Time
                  </div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {batch.harvestTime}
                  </div>
                  <div className="text-[10px] text-emerald-600">Lead: {batch.supervisor}</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Scale className="w-3 h-3 text-slate-400" /> Net Weight
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                    {batch.weight} kg
                  </div>
                  <div className="text-[10px] text-slate-400">Tare verified</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">Pulp Temperature</div>
                  <div className="font-mono font-bold text-blue-700 mt-0.5 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-blue-500" />
                    {batch.pulpTemp}°C
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">Brix Sugar</div>
                  <div className="font-mono font-bold text-slate-800 mt-0.5">
                    {batch.brix}° Bx
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">Shelf Life Remaining</div>
                  <div className="font-semibold text-emerald-700 mt-0.5">
                    {batch.shelfLifeDaysLeft} Days
                  </div>
                </div>
              </div>

              {/* Card Footer with QR Traceability button */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>FSMA 204 Tagged</span>
                </div>

                <button
                  onClick={() => handleOpenPassport(batch)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Inspect Freshness Passport</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Freshness Passport Modal */}
      <FreshnessPassportModal
        batch={selectedBatch}
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />
    </div>
  );
};
