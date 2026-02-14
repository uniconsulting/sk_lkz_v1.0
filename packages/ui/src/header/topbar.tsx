import * as React from 'react';
import Link from 'next/link';
import { Container } from '../container';

export type TopNavItem = { label: string; href: string };

export type TopbarProps = {
  logoSlot?: React.ReactNode;
  nav: TopNavItem[];
  regionLabel: string;
  phoneLabel: string;
  phoneHref: string;
};

export function Topbar({ logoSlot, nav, regionLabel, phoneLabel, phoneHref }: TopbarProps) {
  return (
    <div className="w-full border-b border-fg/10">
      <Container className="h-14 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 min-w-[220px]">
          {logoSlot ? (
            logoSlot
          ) : (
            <div className="text-sm font-semibold tracking-wide">СИМБИРСКИЕ КРАСКИ</div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-fg/60">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-fg transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-sm">
          <div className="hidden sm:flex items-center gap-2 text-fg/70">
            <span className="inline-flex h-8 items-center rounded-m px-3 glass glass-border">
              {regionLabel}
            </span>
          </div>

          <a href={phoneHref} className="text-fg/80 hover:text-fg transition whitespace-nowrap">
            {phoneLabel}
          </a>
        </div>
      </Container>
    </div>
  );
}
