import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  badge?: string;
  variant?: 'default' | 'emerald' | 'amber';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  change,
  trend,
  icon: Icon,
  badge,
  variant = 'default',
}) => {
  const getBorderColor = () => {
    switch (variant) {
      case 'emerald':
        return 'border-emerald-200/80 hover:border-emerald-300';
      case 'amber':
        return 'border-amber-200/80 hover:border-amber-300';
      default:
        return 'border-slate-200 hover:border-slate-300';
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100';
      case 'amber':
        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-100';
      default:
        return 'bg-slate-50 text-slate-700 ring-1 ring-slate-100';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={`relative bg-white rounded-xl p-5 border shadow-subtle ${getBorderColor()} transition-all duration-200`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
              {value}
            </h3>
            {badge && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                {badge}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-lg ${getIconBg()}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtext || change) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          {change && (
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                trend === 'up'
                  ? 'text-emerald-600'
                  : trend === 'down'
                  ? 'text-amber-600'
                  : 'text-slate-500'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
          {subtext && <span className="text-slate-400 truncate">{subtext}</span>}
        </div>
      )}
    </motion.div>
  );
};
