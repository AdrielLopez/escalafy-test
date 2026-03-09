import { CURRENCY_METRICS, INTEGER_METRICS } from './constants';

export function formatMetricValue(metric: string, value: unknown): string {
  // Handle undefined, null, or NaN
  if (value === null || value === undefined) return '-';
  
  const num = typeof value === 'number' ? value : parseFloat(String(value));
  
  if (isNaN(num)) return '-';

  if (INTEGER_METRICS.includes(metric)) {
    return num.toLocaleString();
  }

  if (CURRENCY_METRICS.includes(metric)) {
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return num.toFixed(2);
}

export function formatDate(dateString: string): string {
  try {
    // Handle YYYY-MM-DD format
    const parts = String(dateString).split('-');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    // Fallback to parsing
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return String(dateString);
  } catch {
    return String(dateString);
  }
