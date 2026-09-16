import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Leaf, 
  Zap, 
  Award,
  RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import confetti from 'canvas-confetti';
import { mockAIScenarios } from '../../data/mockData';
import { AIScenario, AIOption } from '../../types';

interface AIDecisionRoomProps {
  initialScenarioId?: string;
}

export const AIDecisionRoom: React.FC<AIDecisionRoomProps> = ({ initialScenarioId }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const currentScenario: AIScenario = mockAIScenarios[selectedScenarioIndex];
  
  // Selected option index (defaulting to the recommended option)
  const getRecommendedOptionId = (scenario: AIScenario) => {
    const rec = scenario.options.find(o => o.isRecommended);
    return rec ? rec.id : scenario.options[0].id;
  };
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    getRecommendedOptionId(currentScenario)
  );

  // Sync selectedOptionId when scenario changes
  useEffect(() => {
    setSelectedOptionId(getRecommendedOptionId(mockAIScenarios[selectedScenarioIndex]));
    setExecutedDecision(null);
  }, [selectedScenarioIndex]);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executedDecision, setExecutedDecision] = useState<{
    scenarioId: string;
    optionTitle: string;
    destination: string;
    timestamp: string;
  } | null>(null);

  const activeOption: AIOption = 
    currentScenario.options.find(o => o.id === selectedOptionId) || currentScenario.options[0];

  // Data for the revenue recovery comparison bar chart
  const revenueChartData = currentScenario.options.map(opt => ({
    name: `Option ${opt.optionNumber}`,
    category: opt.category,
    revenue: opt.revenueRecovered,
    confidence: opt.confidenceScore,
    isRecommended: opt.isRecommended,
  }));

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutedDecision({
        scenarioId: currentScenario.id,
        optionTitle: activeOption.title,
        destination: activeOption.destination,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#065f46', '#f59e0b'],
      });
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-emerald-700" />
              Autonomous Decision Engine • Active Scenario
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            AI Decision Room
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Algorithmic valuation, buyer route matching, and automated surplus/shortage reconciliation.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Scenario:</span>
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs shadow-2xs">
            {mockAIScenarios.map((scenario, idx) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenarioIndex(idx);
                  const newRec = scenario.options.find(o => o.isRecommended);
                  setSelectedOptionId(newRec ? newRec.id : scenario.options[0].id);
                  setExecutedDecision(null);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedScenarioIndex === idx
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {scenario.product} {idx === 0 ? 'Surplus' : 'Deficit'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Incident Alert Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-bio-deep to-emerald-900 text-white rounded-xl p-5 shadow-elevated border border-emerald-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono">
                {currentScenario.badge}
              </span>
              <span className="text-xs text-emerald-200 font-mono">
                Detected: {currentScenario.detectionTime}
              </span>
              <span className="text-xs text-emerald-300 font-mono">
                Source: {currentScenario.batchSource}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>"{currentScenario.title}"</span>
            </h3>

            <p className="text-xs text-emerald-200/90 max-w-2xl leading-relaxed">
              {currentScenario.riskBaseline}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-3.5 rounded-xl backdrop-blur-xs border border-white/15 shrink-0">
            <div className="text-center px-2">
              <span className="block text-[10px] uppercase font-mono text-emerald-300">Fresh Window</span>
              <span className="text-xl font-bold text-white font-mono">{currentScenario.freshnessWindowHours}h</span>
              <span className="block text-[10px] text-emerald-200">Pre-cool buffer</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center px-2">
              <span className="block text-[10px] uppercase font-mono text-emerald-300">Volume</span>
              <span className="text-xl font-bold text-amber-300 font-mono">{currentScenario.quantityStr}</span>
              <span className="block text-[10px] text-emerald-200">Unassigned</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Recommended Action Options */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              BioFresh AI Decision Synthesis (3 Candidate Pathways)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-variable economic and freshness optimization evaluated in 340 milliseconds.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Optimal: Option {currentScenario.options.find(o => o.isRecommended)?.optionNumber ?? '?'} ({currentScenario.options.find(o => o.isRecommended)?.confidenceScore ?? '?'}% Match)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentScenario.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedOptionId(option.id)}
                className={`rounded-xl border p-5 transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/40 border-2 border-emerald-600 shadow-md ring-1 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-subtle'
                }`}
              >
                {/* Recommended Badge on Option 2 */}
                {option.isRecommended && (
                  <div className="absolute -top-3 left-4 bg-gradient-to-r from-emerald-600 to-bio-deep text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    AI RECOMMENDED ACTION
                  </div>
                )}

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-slate-500">
                      OPTION 0{option.optionNumber} • {option.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 font-mono bg-emerald-100/70 px-2 py-0.5 rounded">
                      {option.confidenceScore}% Confidence
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {option.title}
                  </h4>

                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span>Channel:</span>
                    <span className="font-medium text-slate-800">{option.destination}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Metrics Breakdown in Card */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase">Revenue Recovered</div>
                      <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                        +${option.revenueRecovered}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase">Freshness Score</div>
                      <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">
                        {option.freshnessScore}/100
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>⚡ {option.logisticsSpeed}</span>
                    <span className="text-emerald-700 font-medium">-{option.co2SavingsKg} kg CO2e</span>
                  </div>

                  <button
                    className={`w-full py-2 rounded-lg text-xs font-bold transition-all mt-2 flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>Selected for Execution</span>
                      </>
                    ) : (
                      <span>Select Pathway</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Impact Analysis & Action Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Revenue Recovery Recharts Comparison Bar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Revenue Recovery Comparison ($)
              </h3>
              <p className="text-xs text-slate-500">
                Net cash realized per candidate routing pathway.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Max: Option 2 (+$410)
            </span>
          </div>

          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueChartData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                  unit="$"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`$${val}`, 'Revenue Recovered']}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {revenueChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isRecommended ? '#059669' : '#94a3b8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span>Green bar indicates highest net commercial salvage</span>
            <span className="font-semibold text-emerald-700">+115% vs discount</span>
          </div>
        </div>

        {/* Selected Option Deep Impact Analysis & Execution Cockpit (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 tracking-wider">
                Execution Readiness
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Dispatch Summary: {activeOption.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-slate-700">Audit Validated</span>
            </div>
          </div>

          {/* 4 Impact Dimensions Required by Prompt:
              - Revenue recovered
              - Freshness score
              - Waste reduction
              - Recommended action */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-700" />
                Revenue Recovered
              </div>
              <div className="font-mono font-bold text-xl text-emerald-950 mt-1">
                +${activeOption.revenueRecovered}
              </div>
              <div className="text-[10px] text-emerald-700 mt-0.5">Direct margin salvage</div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-700" />
                Freshness Score
              </div>
              <div className="font-mono font-bold text-xl text-blue-950 mt-1">
                {activeOption.freshnessScore}<span className="text-xs font-normal">/100</span>
              </div>
              <div className="text-[10px] text-blue-700 mt-0.5">Optimal consumption</div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <Leaf className="w-3 h-3 text-emerald-700" />
                Waste Reduction
              </div>
              <div className="font-mono font-bold text-xl text-emerald-950 mt-1">
                {activeOption.wasteReductionKg} kg
              </div>
              <div className="text-[10px] text-emerald-700 mt-0.5">100% zero-landfill</div>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-700" />
                AI Recommendation
              </div>
              <div className="font-mono font-bold text-xl text-amber-950 mt-1">
                {activeOption.confidenceScore}%
              </div>
              <div className="text-[10px] text-amber-800 mt-0.5">
                {activeOption.isRecommended ? 'Rank 1 (Top Choice)' : 'Rank 2 Candidate'}
              </div>
            </div>
          </div>

          {/* Logistics & Dispatch Manifest Details */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-slate-800">
              <span>Target Commercial Entity:</span>
              <span className="font-mono text-emerald-800">{activeOption.destination}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Pre-Cool Storage Bay:</span>
              <span>Bay 2 (3.6°C Core Temp Verified)</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Automated Bill of Lading:</span>
              <span className="font-mono">BOL-BF-2026-992</span>
            </div>
          </div>

          {/* Action Execution Button */}
          {executedDecision ? (
            <div className="p-4 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-bold text-sm text-emerald-950">
                    Decision Executed & Dispatched!
                  </div>
                  <div className="text-xs text-emerald-800">
                    Order routed to {executedDecision.destination} at {executedDecision.timestamp}. Manifest & QR Passport transmitted.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setExecutedDecision(null)}
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 cursor-pointer"
              >
                Reset
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                Authorized by Chief Procurement / Packhouse Lead
              </div>

              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-900/10 transition-all cursor-pointer disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting Dispatch & Passport...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Execute Decision (Option 0{activeOption.optionNumber})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
