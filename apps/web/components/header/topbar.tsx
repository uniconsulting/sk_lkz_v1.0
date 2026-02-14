import Link from "next/link";
import { Container } from "@sk/ui";
import { SiteLogo } from "../site-logo";
import { MapPin } from "lucide-react";

export type TopNavItem = { label: string; href: string };

const NAV: TopNavItem[] = [
  { label: "как заказать", href: "#kak-zakazat" },
  { label: "купить оптом", href: "#kupit-optom" },
  { label: "дилерам", href: "#dileram" },
  { label: "блог и новости", href: "#blog" },
];

export function Topbar() {
  return (
    <div className="bg-white">
      <Container className="flex items-center justify-between pt-4 pb-5">
        {/* Left: logo */}
        <div className="flex items-center min-w-[260px]">
          <SiteLogo src="/logo1.png" className="h-[44px] w-auto" />
        </div>

        {/* Center: anchors */}
        <nav
          aria-label="Навигация"
          className="hidden lg:flex flex-1 items-center justify-center"
        >
          <ul className="flex items-center">
            {NAV.map((item, idx) => (
              <li key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-[16px] leading-5 font-medium text-[#26292e]/40 hover:text-[#26292e]/70 transition-colors"
                >
                  {item.label}
                </Link>

                {idx !== NAV.length - 1 && (
                  <span
                    aria-hidden
                    className="mx-5 h-4 w-px bg-[#26292e]/20"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: city + phone */}
        <div className="flex items-center justify-end gap-6 min-w-[260px]">
          <button
            type="button"
            className="flex items-center gap-2 text-[16px] leading-5 text-[#26292e] hover:opacity-80 transition-opacity"
            aria-label="Выбор региона"
          >
            <MapPin className="h-4 w-4 text-[#9caf88] shrink-0" aria-hidden />
            <span>Ульяновск</span>
          </button>

          <Link
            href="tel:+79648589910"
            className="text-[18px] leading-5 font-semibold text-[#26292e] hover:opacity-80 transition-opacity"
          >
            +7 (964) 858-99-10
          </Link>
        </div>
      </Container>
    </div>
  );
}
