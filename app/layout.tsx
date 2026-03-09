import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reporting Dashboard',
  description: 'Multi-channel reporting dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Reporting Dashboard</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
