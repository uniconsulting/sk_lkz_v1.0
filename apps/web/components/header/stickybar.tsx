import Link from "next/link";
import React from "react";
import { Container } from "@sk/ui";
import {
  Calculator,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

type ActionButtonProps = {
  label: string;
  href?: string;
  variant?: "glass" | "accent";
  children: React.ReactNode;
};

function ActionButton({ label, href, variant = "glass", children }: ActionButtonProps) {
  const base =
    "h-16 w-16 rounded-[24px] border border-white/55 flex items-center justify-center transition-colors";
  const glass = "bg-white/70 hover:bg-white/80 text-[#26292e]/60";
  const accent = "bg-[#9caf88] hover:bg-[#9caf88]/90 text-white";

  const cls = `${base} ${variant === "accent" ? accent : glass}`;

  if (href) {
    return (
      <Link aria-label={label} href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={cls}>
      {children}
    </button>
  );
}

export function Stickybar() {
  return (
    <div className="bg-white">
      <Container className="py-5">
        <div className="flex items-center gap-4">
          {/* Общая зелёная капсула: каталог + поиск */}
          <div className="flex items-center h-16 flex-1 rounded-[24px] bg-[#9caf88] border border-white/55 pl-2 pr-4">
            {/* Каталог (без отдельного фонового фрейма) */}
            <button
              type="button"
              className="h-12 flex items-center gap-3 px-4 rounded-[20px] text-white/95 hover:bg-white/10 transition-colors"
              aria-label="Открыть каталог продукции"
            >
              <Menu className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-[18px] leading-5 font-semibold normal-case">
                каталог продукции
              </span>
            </button>

            {/* Поиск (утоплен равномерно, один бордюр) */}
            <div className="ml-2 flex-1 h-12 rounded-[20px] border border-white/55 bg-white/85 flex items-center gap-3 px-4">
              <Search className="h-5 w-5 text-[#26292e]/40 shrink-0" aria-hidden />
              <input
                className="w-full bg-transparent outline-none text-[16px] leading-5 text-[#26292e]/70 placeholder:text-[#26292e]/35"
                placeholder="умный поиск и не только..."
              />
            </div>
          </div>

          {/* Кнопки справа (квадратные, размер как у пилюли, 1 бордюр) */}
          <div className="flex items-center gap-4">
            <ActionButton label="Калькулятор">
              <Calculator className="h-6 w-6 shrink-0" aria-hidden />
            </ActionButton>

            <ActionButton label="Избранное">
              <Heart className="h-6 w-6 shrink-0" aria-hidden />
            </ActionButton>

            <ActionButton label="Корзина" href="/cart">
              <ShoppingCart className="h-6 w-6 shrink-0" aria-hidden />
            </ActionButton>

            <ActionButton label="Вход в ЛК" href="/account" variant="accent">
              <User className="h-6 w-6 shrink-0" aria-hidden />
            </ActionButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
