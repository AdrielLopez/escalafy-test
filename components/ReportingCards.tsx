'use client';

import { METRIC_LABELS } from '@/lib/constants';
import { formatMetricValue } from '@/lib/formatters';

interface ReportingCardsProps {
  totals: Record<string, number>;
  metrics: string[];
}

export function ReportingCards({ totals, metrics }: ReportingCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric}
          className="bg-white rounded-lg shadow-sm p-6 border border-slate-200"
        >
          <p className="text-slate-600 text-sm font-medium mb-2">
            {METRIC_LABELS[metric] || metric}
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatMetricValue(metric, totals[metric])}
          </p>
        </div>
      ))}
    </div>
  );
}
