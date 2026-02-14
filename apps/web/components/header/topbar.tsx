import Link from 'next/link';
import { Container } from '@sk/ui';
import React from 'react';

export type TopNavItem = { label: string; href: string };

export type TopbarProps = {
  logoSlot?: React.ReactNode;
  nav: TopNavItem[];
  regionLabel: string;
  phoneLabel: string;
  phoneHref: string;
};

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="w-5 h-5">
      <path
        d="M12 22s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Topbar({ logoSlot, nav, regionLabel, phoneLabel, phoneHref }: TopbarProps) {
  return (
    <div className="w-full bg-bg border-b border-dark/20">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            {logoSlot ?? (
              <Link href="/" className="text-fg font-semibold">
                СИМБИРСКИЕ КРАСКИ
              </Link>
            )}
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center text-sm text-dark/40">
            {nav.map((item, i) => (
              <React.Fragment key={item.href}>
                <Link href={item.href} className="hover:text-fg transition">
                  {item.label}
                </Link>
                {i !== nav.length - 1 && <span className="mx-4 text-dark/20">|</span>}
              </React.Fragment>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-6 text-sm">
            <button
              type="button"
              className="hidden sm:flex items-center gap-2 text-fg hover:opacity-90 transition"
              aria-label="Выбор региона"
            >
              <span className="text-accent1">
                <PinIcon />
              </span>
              <span className="whitespace-nowrap">{regionLabel}</span>
            </button>

            <a
              href={phoneHref}
              className="text-fg hover:opacity-90 transition whitespace-nowrap font-semibold"
              aria-label="Телефон"
            >
              {phoneLabel}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
