import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from './_providers/theme-provider';
import { garet } from "./fonts";

export const metadata: Metadata = {
  title: 'СИМБИРСКИЕ КРАСКИ',
  description: 'Интернет-магазин лакокрасочной продукции',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={garet.variable}>
      <body className="bg-bg text-fg font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
