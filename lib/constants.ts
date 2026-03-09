export const AVAILABLE_METRICS = [
  // Raw metrics
  { value: 'meta_spend', label: 'Meta Spend' },
  { value: 'meta_impressions', label: 'Meta Impressions' },
  { value: 'google_spend', label: 'Google Spend' },
  { value: 'google_impressions', label: 'Google Impressions' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'orders', label: 'Orders' },
  { value: 'fees', label: 'Fees' },
  // Calculated metrics
  { value: 'meta_cpm', label: 'Meta CPM' },
  { value: 'google_cpm', label: 'Google CPM' },
  { value: 'average_order_value', label: 'Average Order Value' },
  // Derived metrics
  { value: 'total_spend', label: 'Total Spend' },
  { value: 'profit', label: 'Profit' },
  { value: 'roas', label: 'ROAS' },
] as const;

export const METRIC_LABELS: Record<string, string> = {
  meta_spend: 'Meta Spend',
  meta_impressions: 'Meta Impressions',
  google_spend: 'Google Spend',
  google_impressions: 'Google Impressions',
  revenue: 'Revenue',
  orders: 'Orders',
  fees: 'Fees',
  meta_cpm: 'Meta CPM',
  google_cpm: 'Google CPM',
  average_order_value: 'Average Order Value',
  total_spend: 'Total Spend',
  profit: 'Profit',
  roas: 'ROAS',
};

export const CURRENCY_METRICS = [
  'meta_spend',
  'google_spend',
  'revenue',
  'fees',
  'total_spend',
  'profit',
  'meta_cpm',
  'google_cpm',
  'average_order_value',
];

export const INTEGER_METRICS = ['meta_impressions', 'google_impressions', 'orders'];
