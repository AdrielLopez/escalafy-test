'use client';

import { useEffect, useRef } from 'react';
import { useReporting, useDateRange, useMetrics } from '@/hooks';
import { DateRangeSelector } from './DateRangeSelector';
import { MetricsSelector } from './MetricsSelector';
import { DashboardStatus } from './DashboardStatus';
import { ReportingCards } from './ReportingCards';
import { ReportingTable } from './ReportingTable';

interface DashboardClientProps {
  initialData: {
    totals: Record<string, number>;
    daily: Array<Record<string, string | number>>;
  };
  initialStartDate: string;
  initialEndDate: string;
}

const ORG_ID = 1;
const DEFAULT_METRICS = ['revenue', 'total_spend', 'profit'];

export default function DashboardClient({
  initialData,
  initialStartDate,
  initialEndDate,
}: DashboardClientProps) {
  const { data, loading, error, fetch } = useReporting();
  const { startDate, endDate, updateDateRange } = useDateRange(initialStartDate, initialEndDate);
  const { selectedMetrics, toggleMetric } = useMetrics(DEFAULT_METRICS);
  
  // Track if we've done the initial setup to avoid duplicate fetches
  const isInitializedRef = useRef(false);

  // Fetch data when date range or metrics change (but not on initial mount)
  useEffect(() => {
    // Skip the very first render (use server data instead)
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }

    // Don't fetch if no metrics are selected
    if (selectedMetrics.length === 0) {
      return;
    }

    fetch({
      orgId: ORG_ID,
      startDate,
      endDate,
      metrics: selectedMetrics,
    });
  }, [startDate, endDate, selectedMetrics, fetch]);

  // Use initial data on first render, switch to fetched data after
  const displayData = data.daily.length > 0 ? data : initialData;

  return (
    <div className="min-h-screen bg-slate-50" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reporting Dashboard</h1>
          <p className="text-slate-600">Multi-channel analytics aggregation</p>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Date Range */}
          <div className="mb-6">
            <DateRangeSelector
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={(newDate) => updateDateRange(newDate, endDate)}
              onEndDateChange={(newDate) => updateDateRange(startDate, newDate)}
            />
          </div>

          {/* Metrics Selector */}
          <MetricsSelector
            selectedMetrics={selectedMetrics}
            onToggleMetric={toggleMetric}
          />
        </div>

        {/* Status */}
        {(loading || error) && <DashboardStatus loading={loading} error={error} />}

        {/* Metric Cards */}
        {selectedMetrics.length > 0 && !error && (
          <ReportingCards totals={displayData.totals} metrics={selectedMetrics} />
        )}

        {/* Daily Table */}
        {selectedMetrics.length > 0 && !error && (
          <ReportingTable daily={displayData.daily} metrics={selectedMetrics} />
        )}

        {/* Empty State */}
        {selectedMetrics.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-900">Select at least one metric to display data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
