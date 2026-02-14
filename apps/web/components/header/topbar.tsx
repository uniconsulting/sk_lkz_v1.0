import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

export type TopNavItem = { label: string; href: string };

type TopbarProps = {
  nav?: TopNavItem[];
  cityLabel?: string;
  phoneLabel?: string;
  phoneHref?: string;
  logoSlot?: React.ReactNode;
};

const DEFAULT_NAV: TopNavItem[] = [
  { label: "как заказать", href: "#how-to-order" },
  { label: "купить оптом", href: "#b2b" },
  { label: "дилерам", href: "#dealers" },
  { label: "блог и новости", href: "#blog" },
];

function normalizeTelHref(value: string) {
  const digits = value.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? `tel:${digits}` : `tel:+${digits}`;
}

export function Topbar({
  nav = DEFAULT_NAV,
  cityLabel = "Ульяновск",
  phoneLabel = "+7 (964) 858-99-10",
  phoneHref,
  logoSlot,
}: TopbarProps) {
  const telHref = phoneHref ?? normalizeTelHref(phoneLabel);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">{logoSlot}</div>

          <nav className="hidden lg:flex items-center text-[16px]">
            {nav.map((item, idx) => (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-dark/40 hover:text-dark/60 transition-colors"
                >
                  {item.label}
                </Link>

                {idx !== nav.length - 1 && (
                  <span className="mx-5 h-4 w-px bg-dark/20" />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-dark/20 px-4 py-2 text-dark text-[16px] leading-none"
              aria-label="Выбор города"
            >
              <MapPin className="h-5 w-5 text-accent1" />
              <span>{cityLabel}</span>
            </button>

            <a
              href={telHref}
              className="text-dark font-semibold text-[18px] leading-none"
            >
              {phoneLabel}
            </a>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-dark/20" />
    </div>
  );
}
