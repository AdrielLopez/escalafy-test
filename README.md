# Reporting Dashboard - Refactored Architecture

A professional, scalable multi-channel reporting dashboard built with Next.js 16, PostgreSQL, and TypeScript.

### Layered Structure

```
app/                      # Next.js App Router
├── api/reporting/        # REST API endpoint
├── page.tsx              # Server component (SSR)
├── layout.tsx            # Root layout
└── globals.css           # Global styles

components/               # UI Components (client-side)
├── DashboardClient.tsx   # Orchestrator/container
├── DashboardStatus.tsx   # Loading/error states
├── DateRangeSelector.tsx # Date picker UI
├── MetricsSelector.tsx   # Metric toggles
├── ReportingCards.tsx    # Summary cards
└── ReportingTable.tsx    # Daily breakdown table

hooks/                    # Custom React Hooks
├── useReporting.ts       # Data fetching & state
├── useDateRange.ts       # Date range state
└── useMetrics.ts         # Metrics selection state

lib/                      # Business Logic & Utilities
├── db.ts                 # Database pool
├── reporting.ts          # Core metrics calculation
├── constants.ts          # Configuration & labels
└── formatters.ts         # Pure formatting functions
```

## Design Patterns

### 1. Custom Hooks for State Management
- **useReporting**: Encapsulates data fetching with loading/error states
- **useDateRange**: Decoupled date range state
- **useMetrics**: Independent metric selection logic

Benefits: Testable, reusable, composable state logic

### 2. Component Composition
- **Small, focused components**: Each has single responsibility
- **Pure presentational components**: DateRangeSelector, MetricsSelector, ReportingCards, ReportingTable
- **Status components**: DashboardStatus handles loading/error states
- **Orchestrator component**: DashboardClient wires everything together

Benefits: Easy to test, maintain, and extend

### 3. Separation of Concerns
- **API layer** (route.ts): Parameter validation, endpoint logic
- **Business logic** (lib/reporting.ts): Metric calculations, SQL queries
- **Data access** (lib/db.ts): Database connections
- **Utilities** (lib/constants.ts, lib/formatters.ts): Pure functions

Benefits: Testable, maintainable, independent layers

### 4. Server-Side Rendering (SSR)
- Initial data loaded server-side for fast first paint
- Client-side updates for interactive features
- `suppressHydrationWarning` prevents SSR/client mismatch warnings
- `useRef` skips first fetch to reuse server data

Benefits: SEO, performance, smooth user experience

## Setup

### 1. Docker Database
```bash
docker-compose up -d
# PostgreSQL runs on port 5433
```

### 2. Environment Variables
Create `.env.local`:
```
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5433
DB_NAME=escalafy
```

### 3. Install Dependencies
```bash
npm install pg @types/pg
```

### 4. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

## Metrics Reference

### Raw Metrics (from database)
- `meta_spend`: Facebook/Meta advertising spend
- `google_spend`: Google advertising spend
- `revenue`: Total sales revenue
- `orders`: Number of orders
- `fees`: Transaction/payment fees

### Calculated Metrics
- `meta_cpm`: Cost per thousand Meta impressions (meta_spend / meta_impressions * 1000)
- `google_cpm`: Cost per thousand Google impressions (google_spend / google_impressions * 1000)
- `average_order_value`: Average revenue per order (revenue / orders)

### Derived Metrics
- `total_spend`: total_spend = meta_spend + google_spend
- `profit`: profit = revenue - total_spend - fees
- `roas`: Return on ad spend (revenue / total_spend)

## API Endpoint

### GET /api/reporting

Query Parameters:
- `orgId` (required): Organization ID
- `startDate` (required): YYYY-MM-DD format
- `endDate` (required): YYYY-MM-DD format
- `metrics` (required): Comma-separated metric names

Example:
```bash
curl "http://localhost:3000/api/reporting?orgId=1&startDate=2024-12-01&endDate=2024-12-31&metrics=meta_spend,revenue,profit"
```

Response:
```json
{
  "totals": {
    "meta_spend": 5000,
    "revenue": 25000,
    "profit": 15000
  },
  "daily": [
    {
      "date": "2024-12-01",
      "meta_spend": 100,
      "revenue": 500,
      "profit": 300
    }
  ]
}
```

## Key Features

✅ **Professional Architecture**: Layered with clear separation of concerns
✅ **Type Safety**: Full TypeScript with strict mode
✅ **Error Handling**: Graceful error messages at every level
✅ **Performance**: Server-side rendered with client-side interactivity
✅ **Responsive Design**: Tailwind CSS for all screen sizes
✅ **Defensive Programming**: Null/undefined checks in utilities
✅ **Date Handling**: Improved date input styling and formatting
✅ **Smart API Calls**: Only fetches when metrics selected

## Development Notes

### Bug Fixes Implemented
1. **Hydration Mismatch**: Added suppressHydrationWarning to prevent SSR/client conflicts
2. **formatMetricValue Errors**: Defensive coding handles undefined values
3. **Date Input Styling**: Enhanced visuals for better readability
4. **Unnecessary API Calls**: Added condition to skip fetch when no metrics selected

### Testing
- TypeScript strict mode passes
- All components render without errors
- Dashboard loads with server-side initial data
- Metric selection triggers correct API calls
- Date range changes update data
- Table shows complete date range (no gaps)
- Error states display cleanly

## Future Improvements

- Add database migration system (e.g., Migrate)
- Implement caching layer (e.g., Redis)
- Add analytics tracking (e.g., Sentry)
- Create automated tests (Jest + React Testing Library)
- Add data export functionality (CSV/PDF)
- Implement user authentication
- Add date preset buttons (Last 7/30/90 days)

