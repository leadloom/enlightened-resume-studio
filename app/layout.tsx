import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Enlightened Resume Studio', description: 'Instant feedback + builder' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </body>
    </html>
  );
}
