import React from "react";
import Link from "next/link";
import { Container } from "@sk/ui";

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
    <svg width="18" height="18" viewBox="0 0 24 24" className="block">
      <path
        d="M12 22s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Topbar({
  logoSlot,
  nav,
  regionLabel,
  phoneLabel,
  phoneHref,
}: TopbarProps) {
  return (
    <div className="w-full bg-bg border-b border-dark/10">
      <Container className="py-5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center">{logoSlot}</div>

          <nav className="hidden lg:flex items-center text-sm text-dark/40">
            <ul className="flex items-center">
              {nav.map((item, idx) => (
                <li key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    className="hover:text-dark/60 transition-colors"
                  >
                    {item.label}
                  </Link>

                  {idx !== nav.length - 1 && (
                    <span
                      aria-hidden
                      className="mx-6 inline-block h-4 w-px bg-dark/10"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6 text-sm">
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 text-dark hover:opacity-90 transition"
              aria-label="Выбор региона"
            >
              <span className="text-accent1">
                <PinIcon />
              </span>
              <span className="whitespace-nowrap">{regionLabel}</span>
            </button>

            <a
              href={phoneHref}
              className="text-dark font-semibold whitespace-nowrap hover:opacity-90 transition"
            >
              {phoneLabel}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
