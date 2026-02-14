import Link from 'next/link';
import { Container } from '@sk/ui';

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
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-accent1">
      <path
        d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Topbar({ logoSlot, nav, regionLabel, phoneLabel, phoneHref }: TopbarProps) {
  return (
    <div className="w-full border-b border-fg/10">
      <Container className="h-14 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 min-w-[220px]">{logoSlot}</div>

        <nav className="hidden md:flex items-center text-sm text-fg/45">
          {nav.map((item, i) => (
            <div key={item.href} className="flex items-center">
              <Link href={item.href} className="px-3 hover:text-fg transition">
                {item.label}
              </Link>
              {i !== nav.length - 1 && <span className="text-fg/20">|</span>}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-sm">
          <button
            type="button"
            className="hidden sm:flex items-center gap-2 text-fg/70 hover:text-fg transition"
            aria-label="Выбор региона"
          >
            <PinIcon />
            <span className="whitespace-nowrap">{regionLabel}</span>
          </button>

          <a href={phoneHref} className="text-fg/80 hover:text-fg transition whitespace-nowrap font-medium">
            {phoneLabel}
          </a>
        </div>
      </Container>
    </div>
  );
}
