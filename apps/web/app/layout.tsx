import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from './_providers/theme-provider';

export const metadata: Metadata = {
  title: 'СИМБИРСКИЕ КРАСКИ',
  description: 'Интернет-магазин лакокрасочной продукции',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
