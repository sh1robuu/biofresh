import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RiskAlert } from '../../types';

interface RiskAlertBannerProps {
  alerts: RiskAlert[];
  onTakeAction?: (alert: RiskAlert) => void;
}

export const RiskAlertBanner: React.FC<RiskAlertBannerProps> = ({ alerts, onTakeAction }) => {
  const getIcon = (type: RiskAlert['type']) => {
    switch (type) {
      case 'Shortage Risk':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'Delivery Delay':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Quality Risk':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
    }
  };

  const getBorderBadge = (severity: RiskAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-rose-200 bg-rose-50/50 hover:bg-rose-50';
      case 'warning':
        return 'border-amber-200 bg-amber-50/50 hover:bg-amber-50';
      default:
        return 'border-blue-200 bg-blue-50/50 hover:bg-blue-50';
    }
  };

  return (
    <div className="space-y-2.5">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border text-sm transition-all duration-200 ${getBorderBadge(
            alert.severity
          )}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1 rounded bg-white shadow-xs">
              {getIcon(alert.type)}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-900">{alert.title}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                  {alert.type}
                </span>
                <span className="text-xs text-slate-400">{alert.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                {alert.description}
              </p>
              <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 pt-0.5">
                <span className="text-slate-400">Impact:</span>
                <span className="text-slate-700">{alert.impact}</span>
              </div>
            </div>
          </div>

          <div className="sm:self-center shrink-0">
            <button
              onClick={() => onTakeAction && onTakeAction(alert)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:text-emerald-700 hover:border-emerald-400 shadow-2xs transition-all"
            >
              <span>Resolve in AI Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
