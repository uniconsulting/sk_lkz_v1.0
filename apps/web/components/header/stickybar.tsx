import { Container } from "@sk/ui";
import { Calculator, Heart, Menu, Search, ShoppingCart, User } from "lucide-react";

export type StickybarProps = {
  catalogLabel?: string;
  searchPlaceholder?: string;
};

export function Stickybar({
  catalogLabel = "каталог продукции",
  searchPlaceholder = "умный поиск и не только...",
}: StickybarProps) {
  return (
    <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md">
      <Container className="py-3">
        <div className="flex items-center gap-4">
          <div className="header-dock glass-border bg-accent1 h-16 rounded-3xl p-2 flex items-center gap-4 flex-1 max-w-[920px]">
            <button
              type="button"
              className="h-12 flex items-center gap-4 text-white font-semibold hover:opacity-90 transition"
              aria-label="Каталог продукции"
            >
              <span className="h-10 w-10 inline-flex items-center justify-center">
                <Menu size={18} strokeWidth={2} />
              </span>
              <span className="text-sm leading-none">{catalogLabel}</span>
            </button>

            <div className="header-search glass-border bg-white h-12 flex-1 rounded-[20px] px-4 flex items-center gap-3">
              <span className="text-accent1 inline-flex items-center justify-center">
                <Search size={18} strokeWidth={2} />
              </span>

              <input
                className="w-full bg-transparent outline-none text-sm text-fg placeholder:text-fg/40"
                placeholder={searchPlaceholder}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              className="header-icon glass-border h-16 w-16 rounded-3xl inline-flex items-center justify-center text-fg/70"
              aria-label="Калькулятор расхода"
            >
              <Calculator size={18} strokeWidth={2} />
            </button>

            <button
              className="header-icon glass-border h-16 w-16 rounded-3xl inline-flex items-center justify-center text-fg/70"
              aria-label="Избранное"
            >
              <Heart size={18} strokeWidth={2} />
            </button>

            <button
              className="header-icon glass-border h-16 w-16 rounded-3xl inline-flex items-center justify-center text-fg/70"
              aria-label="Корзина"
            >
              <ShoppingCart size={18} strokeWidth={2} />
            </button>

            <button
              className="header-icon header-icon--accent glass-border bg-accent1 h-16 w-16 rounded-3xl inline-flex items-center justify-center text-white"
              aria-label="Вход в ЛК"
            >
              <User size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
