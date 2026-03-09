import { useState, useCallback } from 'react';

export interface ReportingData {
  totals: Record<string, number>;
  daily: Array<Record<string, string | number>>;
}

interface UseReportingParams {
  orgId: number;
  startDate: string;
  endDate: string;
  metrics: string[];
}

export function useReporting() {
  const [data, setData] = useState<ReportingData>({ totals: {}, daily: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (params: UseReportingParams) => {
    setLoading(true);
    setError(null);

    try {
      const metricsQuery = params.metrics.join(',');
      const url = `/api/reporting?orgId=${params.orgId}&startDate=${params.startDate}&endDate=${params.endDate}&metrics=${metricsQuery}`;
      const response = await globalThis.fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch reporting data');
      }

      const newData: ReportingData = await response.json();
      setData(newData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Reporting fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
}
