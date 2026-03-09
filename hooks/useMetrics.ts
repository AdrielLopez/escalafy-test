import { useState, useCallback } from 'react';

export function useMetrics(initialMetrics: string[]) {
  const [selectedMetrics, setSelectedMetrics] = useState(initialMetrics);

  const toggleMetric = useCallback((metric: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  }, []);

  return { selectedMetrics, toggleMetric };
}
