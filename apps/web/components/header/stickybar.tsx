import Link from "next/link";
import { Container } from "@sk/ui";
import {
  Calculator,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

export type StickybarProps = {
  catalogLabel?: string;
  searchPlaceholder?: string;
};

export function Stickybar({
  catalogLabel = "каталог продукции",
  searchPlaceholder = "умный поиск и не только...",
}: StickybarProps) {
  return (
    <div data-stickybar className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md">
      <Container className="pt-5 pb-3">
        <div className="flex items-center gap-4">
          <div className="header-dock glass-border bg-accent1 h-16 rounded-3xl p-2 flex items-center gap-4 flex-1 max-w-[960px]">
            <button
              type="button"
              className="h-14 inline-flex items-center gap-4 text-white font-semibold hover:opacity-90 transition px-2"
              aria-label="Каталог продукции"
            >
              <Menu className="h-6 w-6" aria-hidden />
              <span className="text-base leading-none whitespace-nowrap">
                {catalogLabel}
              </span>
            </button>

            <div className="header-search glass-border ui-focus-glass ui-search-wrap bg-white h-12 flex-1 rounded-[18px] px-4 flex items-center gap-3">
              <Search className="h-5 w-5 text-accent1" aria-hidden />
              <input
                className="w-full ui-search-icon bg-transparent outline-none text-sm text-fg placeholder:text-fg/40"
                placeholder={searchPlaceholder}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              className="header-icon glass-border bg-white h-16 w-16 rounded-3xl inline-flex items-center justify-center ui-icon-hover-accent1 ui-press"
              aria-label="Калькулятор расхода"
            >
              <Calculator className="h-6 w-6" aria-hidden />
            </button>

            <button
              className="header-icon glass-border bg-white h-16 w-16 rounded-3xl inline-flex items-center justify-center ui-icon-hover-accent1 ui-press"
              aria-label="Избранное"
            >
              <Heart className="h-6 w-6" aria-hidden />
            </button>

            <button
              className="header-icon glass-border bg-white h-16 w-16 rounded-3xl inline-flex items-center justify-center ui-icon-hover-accent1 ui-press"
              aria-label="Корзина"
            >
              <ShoppingCart className="h-6 w-6" aria-hidden />
            </button>

            {/* Вход в ЛК/Админку */}
            <Link
              href="/auth?next=/admin"
              className="header-icon glass-border bg-accent1 h-16 w-16 rounded-3xl inline-flex items-center justify-center text-white ui-press"
              aria-label="Вход в ЛК"
              title="Вход"
            >
              <User className="h-6 w-6" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
