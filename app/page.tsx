import { DashboardClient } from '@/components/DashboardClient';
import { getReporting } from '@/lib/reporting';

const ORG_ID = '1';
const DEFAULT_METRICS = ['meta_spend', 'google_spend', 'revenue', 'profit'];

export default async function Home() {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 30);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  try {
    const initialData = await getReporting(
      ORG_ID,
      formatDate(startDate),
      formatDate(endDate),
      DEFAULT_METRICS
    );

    return <DashboardClient initialData={initialData} defaultMetrics={DEFAULT_METRICS} />;
  } catch (error) {
    console.error('Failed to load reporting data:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-900 font-medium">Error loading dashboard</p>
          <p className="text-red-800 text-sm">Failed to fetch initial reporting data</p>
        </div>
      </div>
    );
  }
}
