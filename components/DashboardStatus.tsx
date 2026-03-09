'use client';

interface DashboardStatusProps {
  loading: boolean;
  error: string | null;
}

export function DashboardStatus({ loading, error }: DashboardStatusProps) {
  if (!loading && !error) return null;

  return (
    <div className="col-span-full">
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900">Loading data...</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-900 font-medium">Error:</p>
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}
