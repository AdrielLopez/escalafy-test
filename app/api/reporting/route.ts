import { NextRequest, NextResponse } from 'next/server';
import { getReporting } from '@/lib/reporting';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const orgId = searchParams.get('orgId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const metricsParam = searchParams.get('metrics');

    // Validation
    if (!orgId || !startDate || !endDate || !metricsParam) {
      return NextResponse.json(
        { error: 'Missing required query parameters: orgId, startDate, endDate, metrics' },
        { status: 400 }
      );
    }

    if (startDate > endDate) {
      return NextResponse.json(
        { error: 'Invalid date range: endDate must be greater than or equal to startDate' },
        { status: 400 }
      );
    }

    const metrics = metricsParam.split(',').map((m) => m.trim());

    const result = await getReporting({
      orgId: parseInt(orgId),
      startDate,
      endDate,
      metrics,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Reporting API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
