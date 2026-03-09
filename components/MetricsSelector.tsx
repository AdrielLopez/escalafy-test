'use client';

import { AVAILABLE_METRICS } from '@/lib/constants';

interface MetricsSelectorProps {
  selectedMetrics: string[];
  onToggleMetric: (metric: string) => void;
}

export function MetricsSelector({
  selectedMetrics,
  onToggleMetric,
}: MetricsSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-3">
        Select Metrics
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {AVAILABLE_METRICS.map((metric) => (
          <button
            key={metric.value}
            onClick={() => onToggleMetric(metric.value)}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              selectedMetrics.includes(metric.value)
                ? 'bg-blue-100 border-blue-500 text-blue-900'
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>
    </div>
  );
}
