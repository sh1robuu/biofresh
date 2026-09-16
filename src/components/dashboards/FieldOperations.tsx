import React, { useState } from 'react';
import { 
  Smartphone, 
  Users, 
  Target, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Scan, 
  Compass, 
  CloudSun, 
  Droplets, 
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { mockPickers, mockFieldSupervisorStats, mockHarvestProgressByHour } from '../../data/mockData';

export const FieldOperations: React.FC = () => {
  // Interactive Picker Mobile State
  const [pickerCrates, setPickerCrates] = useState<number>(14);
  const [lastScannedCrate, setLastScannedCrate] = useState<string>('CRATE-SB-4019');
  const [pushToast, setPushToast] = useState(false);

  const pickerCurrentKg = pickerCrates * 15; // 15kg per crate
  const pickerTargetKg = 250;
  const pickerProgressPct = Math.min(100, Math.round((pickerCurrentKg / pickerTargetKg) * 100));

  const handleIncrement = () => {
    setPickerCrates((prev) => prev + 1);
    const newId = `CRATE-SB-${Math.floor(4000 + Math.random() * 900)}`;
    setLastScannedCrate(newId);
  };

  const handleDecrement = () => {
    if (pickerCrates > 0) {
      setPickerCrates((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
              Field Mesh • GPS Sector 4A & 4B
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Field Operations & Harvest Coordination
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time picker mobile instructions, in-field yield telemetry, and supervisor allocation dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <CloudSun className="w-4 h-4 text-amber-500" />
            <span>19.4°C</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>68% Humidity</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>Sector 4A Sunny Valley</span>
          </div>
        </div>
      </div>

      {/* Supervisor Top KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          label="Target Harvest"
          value="5,000 kg"
          subtext="Daily locked orders"
          icon={Target}
          variant="default"
        />
        <MetricCard
          label="Harvested Quantity"
          value={`${mockFieldSupervisorStats.harvestedQuantity.toLocaleString()} kg`}
          subtext="Weighed in packhouse"
          change="+8% ahead"
          trend="up"
          icon={CheckCircle2}
          variant="emerald"
        />
        <MetricCard
          label="Progress Complete"
          value={`${mockFieldSupervisorStats.progressPercentage}%`}
          subtext="1,260 kg remaining"
          icon={TrendingUp}
          variant="emerald"
        />
        <MetricCard
          label="Active Field Crew"
          value={mockFieldSupervisorStats.activePickersCount}
          subtext="4 crew supervisors"
          badge="98.2% attendance"
          icon={Users}
          variant="default"
        />
      </div>

      {/* Prominent Quality Warning Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Quality risk detected
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-amber-800 border border-amber-200">
                Sector 4B • Row 12–18
              </span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Optical sensors and field supervisor flagged 4.2% micro-bruising risk from morning dew condensation. Recommended size tolerance adjusted to 30mm+.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button 
            onClick={() => {
              setPushToast(true);
              setTimeout(() => setPushToast(false), 2500);
            }}
            className={`px-3.5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors shadow-sm whitespace-nowrap cursor-pointer ${pushToast ? 'ring-2 ring-amber-400' : ''}`}
          >
            {pushToast ? '✓ Instruction Pushed' : 'Push Instruction Update to Pickers'}
          </button>
        </div>
      </div>

      {/* Split Layout: Mobile Picker App Simulator (Left) + Supervisor Deep Dashboard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Mobile Picker App Simulator (5 columns) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              Picker Mobile Terminal (In-Field View)
            </div>
            <span className="text-[11px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              BioFresh Mobile v3.2
            </span>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[370px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
            {/* Speaker Notch */}
            <div className="w-28 h-4 bg-slate-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
            </div>

            {/* Phone Screen */}
            <div className="bg-white rounded-[2rem] p-4 text-slate-900 space-y-4 overflow-hidden border border-slate-100">
              {/* Mobile Top Bar */}
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                    MS
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Marco Silva</div>
                    <div className="text-[10px] text-slate-400">Picker ID #P-408</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>

              {/* Active Harvest Task Box */}
              <div className="bg-emerald-950 text-white p-3.5 rounded-xl space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-300">
                    Active Assignment
                  </span>
                  <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded font-mono">
                    Sector 4A
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Albion Strawberry</h4>
                  <p className="text-[11px] text-emerald-200">Export Grade A Specification</p>
                </div>

                <div className="pt-2 border-t border-emerald-800/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-emerald-300/80 block text-[10px]">Size Requirement</span>
                    <strong className="text-white font-mono text-xs">28mm – 32mm</strong>
                  </div>
                  <div>
                    <span className="text-emerald-300/80 block text-[10px]">Min. Brix Sugar</span>
                    <strong className="text-white font-mono text-xs">≥ 8.5° Bx</strong>
                  </div>
                </div>
              </div>

              {/* Picking Instruction Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Picking Instruction
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  Select fruit with 85%+ uniform red blush. Leave 1cm stem attached. Do not compress in crate. Discard white-tip fruit.
                </p>
              </div>

              {/* Interactive Quantity Input & Counter */}
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-950">Logged Crates</span>
                  <span className="font-mono text-emerald-800 font-semibold">{pickerCurrentKg} kg total</span>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-emerald-200">
                  <button
                    onClick={handleDecrement}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <div className="font-mono font-bold text-2xl text-slate-900">
                      {pickerCrates}
                    </div>
                    <div className="text-[10px] text-slate-400">Crates (15 kg each)</div>
                  </div>

                  <button
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center font-bold text-lg transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-mono text-slate-600">
                    <Scan className="w-3 h-3 text-emerald-600" />
                    Last: {lastScannedCrate}
                  </span>
                  <span className="text-emerald-700 font-medium">Auto-NFC Synced</span>
                </div>
              </div>

              {/* Job Progress Tracking Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Daily Quota Progress</span>
                  <span className="font-mono text-emerald-700">{pickerProgressPct}% ({pickerCurrentKg}/{pickerTargetKg} kg)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-bio-fresh transition-all duration-300 rounded-full"
                    style={{ width: `${pickerProgressPct}%` }}
                  ></div>
                </div>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={handleIncrement}
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Scan className="w-4 h-4" />
                <span>Scan & Log Next Crate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Supervisor Operations Dashboard (7 columns) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Hourly Harvest Progress Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Harvest Yield Velocity vs. Hourly Target (kg)
                </h3>
                <p className="text-xs text-slate-500">
                  Hourly field weigh-in stream tracking morning dew recovery.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Avg 748 kg/hr
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockHarvestProgressByHour}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    unit="kg"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar
                    dataKey="target"
                    name="Target Capacity (kg)"
                    fill="#cbd5e1"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="harvested"
                    name="Actual Harvested (kg)"
                    fill="#059669"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Pickers & Team Dispatch Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Active Field Picker Dispatch List
                </h3>
                <p className="text-xs text-slate-500">
                  GPS zone allocations, crates per hour pace, and optical QC pass rate.
                </p>
              </div>
              <Badge variant="emerald" dot size="sm">
                28 Active
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Picker</th>
                    <th className="py-2.5 px-4">Field Sector</th>
                    <th className="py-2.5 px-4">Harvested / Target</th>
                    <th className="py-2.5 px-4">Rate (crates/h)</th>
                    <th className="py-2.5 px-4">QC Pass</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {mockPickers.map((picker) => (
                    <tr key={picker.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {picker.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                        {picker.zone}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className="font-semibold text-slate-900">
                          {picker.harvestedKg}
                        </span>{' '}
                        <span className="text-slate-400">/ {picker.targetKg} kg</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-700">
                        {picker.cratesPerHour}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span
                          className={
                            picker.qualityPassingRate < 95
                              ? 'text-amber-600 font-bold'
                              : 'text-emerald-700'
                          }
                        >
                          {picker.qualityPassingRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {picker.status === 'Active' && (
                          <Badge variant="emerald" size="sm" dot>Active</Badge>
                        )}
                        {picker.status === 'QC Inspection' && (
                          <Badge variant="amber" size="sm" dot>QC Check</Badge>
                        )}
                        {picker.status === 'Break' && (
                          <Badge variant="slate" size="sm">Break</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>All pickers synchronized via Bluetooth Low Energy mesh</span>
              <span className="text-emerald-700 font-medium">Field Lead: Mateo Ortiz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
