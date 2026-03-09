'use client';

import { METRIC_LABELS } from '@/lib/constants';
import { formatMetricValue, formatDate } from '@/lib/formatters';

interface ReportingTableProps {
  daily: Array<Record<string, string | number>>;
  metrics: string[];
}

export function ReportingTable({ daily, metrics }: ReportingTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
              {metrics.map((metric) => (
                <th
                  key={metric}
                  className="px-6 py-3 text-right text-sm font-semibold text-slate-900"
                >
                  {METRIC_LABELS[metric] || metric}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daily.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-3 text-sm text-slate-900 font-medium">
                  {formatDate(String(row.date))}
                </td>
                {metrics.map((metric) => (
                  <td
                    key={metric}
                    className="px-6 py-3 text-sm text-slate-600 text-right"
                  >
                    {formatMetricValue(metric, row[metric])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
