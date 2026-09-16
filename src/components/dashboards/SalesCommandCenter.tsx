import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Scale, 
  CheckCircle2, 
  DollarSign, 
  Percent, 
  Search, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend
} from 'recharts';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { RiskAlertBanner } from '../ui/RiskAlertBanner';
import { mockBuyerOrders, mockRiskAlerts, mockDemandVsSupply } from '../../data/mockData';
import { BuyerOrder, RiskAlert } from '../../types';

interface SalesCommandCenterProps {
  onResolveRiskInAI?: (risk: RiskAlert) => void;
}

export const SalesCommandCenter: React.FC<SalesCommandCenterProps> = ({ onResolveRiskInAI }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshToast, setRefreshToast] = useState(false);

  const filteredOrders = mockBuyerOrders.filter((order) => {
    const matchesSearch =
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.variety.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'All') return matchesSearch;
    if (filterStatus === 'Allocated') return matchesSearch && (order.status === 'Allocated' || order.status === 'On Track');
    if (filterStatus === 'Shortage Risk') return matchesSearch && order.status === 'Shortage Risk';
    if (filterStatus === 'Pending') return matchesSearch && order.status === 'Pending Dispatch';
    return matchesSearch;
  });

  const getStatusBadge = (status: BuyerOrder['status']) => {
    switch (status) {
      case 'Allocated':
        return <Badge variant="emerald" dot>Allocated</Badge>;
      case 'On Track':
        return <Badge variant="emerald" dot>On Track</Badge>;
      case 'Shortage Risk':
        return <Badge variant="rose" dot>Shortage Risk</Badge>;
      case 'Pending Dispatch':
        return <Badge variant="amber" dot>Pending Dispatch</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
              Live Commercial Grid • Session Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Sales Command Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time buyer demand allocation, order fulfillment velocity, and harvest reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono font-semibold text-slate-900">14:24 PST</div>
            <div className="text-[11px] text-emerald-600">Reconciliation Cycle #6</div>
          </div>
          <button 
            onClick={() => {
              setRefreshToast(true);
              setTimeout(() => setRefreshToast(false), 2000);
            }}
            className={`p-2 text-slate-600 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm ${refreshToast ? 'ring-2 ring-emerald-400' : ''}`}
            title="Refresh Grid"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <MetricCard
          label="Open Orders"
          value="42"
          subtext="6 priority accounts"
          change="+12% vs yesterday"
          trend="up"
          icon={ShoppingCart}
          variant="default"
        />
        <MetricCard
          label="Required Today"
          value="4,850 kg"
          subtext="Total locked demand"
          icon={Scale}
          variant="default"
        />
        <MetricCard
          label="Allocated Quantity"
          value="4,620 kg"
          subtext="Committed to buyers"
          change="95.3% fulfilled"
          trend="up"
          icon={CheckCircle2}
          variant="emerald"
        />
        <MetricCard
          label="Expected Revenue"
          value="$148,200"
          subtext="Daily gross sales"
          change="+$14.2k vs avg"
          trend="up"
          icon={DollarSign}
          variant="emerald"
        />
        <MetricCard
          label="Demand Coverage"
          value="95.3%"
          subtext="Shortfall: 230 kg"
          badge="4.7% deficit"
          trend="down"
          icon={Percent}
          variant="amber"
        />
      </div>

      {/* Interactive Supply Chain Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              End-to-End Batch Progression Timeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current stage status across 4,850 kg daily demand throughput.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Real-Time Stage Sync
          </span>
        </div>

        {/* Timeline flow: Demand -> Harvest -> QC -> Inventory -> Decision -> Execution */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {/* Step 1 */}
          <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 relative">
            <div className="flex items-center justify-between text-[11px] text-emerald-800 font-mono mb-1">
              <span>01. DEMAND</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="font-semibold text-slate-900">Orders Locked</div>
            <div className="text-[11px] text-slate-500 mt-0.5">4,850 kg confirmed</div>
            <div className="mt-2 text-[10px] text-emerald-700 font-medium">100% Locked (24h)</div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 relative">
            <div className="flex items-center justify-between text-[11px] text-emerald-800 font-mono mb-1">
              <span>02. HARVEST</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="font-semibold text-slate-900">Field Picking</div>
            <div className="text-[11px] text-slate-500 mt-0.5">3,740 kg harvested</div>
            <div className="mt-2 text-[10px] text-emerald-700 font-medium">74.8% Complete</div>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 relative">
            <div className="flex items-center justify-between text-[11px] text-emerald-800 font-mono mb-1">
              <span>03. QC</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="font-semibold text-slate-900">Optical Grading</div>
            <div className="text-[11px] text-slate-500 mt-0.5">82% Grade A yield</div>
            <div className="mt-2 text-[10px] text-emerald-700 font-medium">Zero-Residue OK</div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 relative">
            <div className="flex items-center justify-between text-[11px] text-emerald-800 font-mono mb-1">
              <span>04. INVENTORY</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="font-semibold text-slate-900">Rapid Pre-Cool</div>
            <div className="text-[11px] text-slate-500 mt-0.5">3.6°C Core Temp</div>
            <div className="mt-2 text-[10px] text-emerald-700 font-medium">4 Batches in Bay</div>
          </div>

          {/* Step 5 - Current Active */}
          <div className="p-3 rounded-lg border-2 border-amber-400 bg-amber-50/50 relative shadow-xs animate-pulse-slow">
            <div className="flex items-center justify-between text-[11px] text-amber-900 font-mono mb-1">
              <span>05. DECISION</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            </div>
            <div className="font-semibold text-slate-900">AI Reallocation</div>
            <div className="text-[11px] text-slate-600 mt-0.5">35kg surplus routed</div>
            <div className="mt-2 text-[10px] text-amber-800 font-bold">Action Pending (96% conf)</div>
          </div>

          {/* Step 6 */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 relative">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
              <span>06. EXECUTION</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="font-semibold text-slate-700">Dispatch & Passport</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Manifest 4/6 ready</div>
            <div className="mt-2 text-[10px] text-slate-500 font-medium">Dock departures on-time</div>
          </div>
        </div>
      </div>

      {/* Risk Alert Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-rose-50 text-rose-600">
              <AlertCircle className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Active Supply Chain Risk Alerts ({mockRiskAlerts.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                AI automated exception detection monitoring shortage, delivery transit and quality variances.
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-mono">Real-time Stream</span>
        </div>

        <RiskAlertBanner 
          alerts={mockRiskAlerts} 
          onTakeAction={(alert) => onResolveRiskInAI && onResolveRiskInAI(alert)}
        />
      </div>

      {/* Grid: Buyer Order Table & Demand vs Supply Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buyer Order Table (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Daily Buyer Order Allocation Table
                </h3>
                <p className="text-xs text-slate-500">
                  Target specifications, contracted allocations and delivery windows.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search buyer or crop..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 text-slate-800 w-44"
                  />
                </div>

                <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
                  {['All', 'Allocated', 'Shortage Risk', 'Pending'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilterStatus(tab)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        filterStatus === tab
                          ? 'bg-emerald-700 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Buyer</th>
                    <th className="py-3 px-4">Product & Variety</th>
                    <th className="py-3 px-4 text-right">Required Quantity</th>
                    <th className="py-3 px-4 text-right">Allocated</th>
                    <th className="py-3 px-4">Delivery Window</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-emerald-50/30 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{order.buyer}</div>
                        <div className="text-[11px] text-slate-400">{order.buyerType}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-900 font-medium">{order.product}</div>
                        <div className="text-[11px] text-slate-400">{order.variety}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">
                        {order.requiredQuantity} {order.unit}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        <span
                          className={`${
                            order.allocatedQuantity < order.requiredQuantity
                              ? 'text-rose-600 font-bold'
                              : 'text-emerald-700 font-semibold'
                          }`}
                        >
                          {order.allocatedQuantity} {order.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {order.deliveryDate}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredOrders.length} of {mockBuyerOrders.length} orders</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automated reconciliation matches 95.3%
            </span>
          </div>
        </div>

        {/* Demand vs Supply Recharts Chart (1 column) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Demand vs. Harvest Pace
                </h3>
                <p className="text-xs text-slate-500">
                  Cumulative kg curves across operational day.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Hourly Telemetry</span>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockDemandVsSupply}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorHarvest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="time"
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
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    name="Buyer Demand (kg)"
                    stroke="#475569"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#colorDemand)"
                  />
                  <Area
                    type="monotone"
                    dataKey="actualHarvest"
                    name="Actual Harvest (kg)"
                    stroke="#059669"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorHarvest)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Harvest pacing +8% ahead of target
            </span>
            <span className="font-mono text-slate-400">Updated 14:24</span>
          </div>
        </div>
      </div>
    </div>
  );
};
