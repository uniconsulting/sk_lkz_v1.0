import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@sk/ui";
import { MapPin } from "lucide-react";

export type TopNavItem = { label: string; href: string };

export type TopbarProps = {
  logoSlot?: ReactNode;
  nav: TopNavItem[];
  regionLabel: string;
  phoneLabel: string;
  phoneHref: string;
  themeSlot?: ReactNode; // вставка ThemeToggle справа от телефона
};

export function Topbar({
  logoSlot,
  nav,
  regionLabel,
  phoneLabel,
  phoneHref,
  themeSlot,
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
                    className="ui-hover-accent"
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
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <span className="whitespace-nowrap">{regionLabel}</span>
            </button>

            <a
              href={phoneHref}
              className="text-dark font-semibold whitespace-nowrap ui-hover-accent"
            >
              {phoneLabel}
            </a>

            {themeSlot ? (
              <div className="flex items-center">{themeSlot}</div>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
