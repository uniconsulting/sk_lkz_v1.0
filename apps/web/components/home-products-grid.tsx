"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Heart, FileText, BadgePercent } from "lucide-react";

import { products as STORE_PRODUCTS, miniBanners as STORE_MINI_BANNERS, finalBannerSrc as STORE_FINAL_BANNER_SRC } from "../lib/products-store";

type Product = {
  id: string;
  href?: string;
  imageSrc: string;
  brand: string;
  title: string;
  priceRub: number;

  // флаги/ранги из админки/стора
  showOnHome?: boolean;
  homeRank?: number;
  showInMega?: boolean;
  megaRank?: number;
};

type MiniBanner = { id: string; src?: string; alt?: string; href?: string };

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function formatRub(v: number) {
  return new Intl.NumberFormat("ru-RU").format(v) + " ₽";
}

function clampRank(v: unknown) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 9999;
}

function takeRanked({
  src,
  count,
  pick,
  rank,
}: {
  src: Product[];
  count: number;
  pick: (p: Product) => boolean;
  rank: (p: Product) => number;
}) {
  const ranked = src
    .filter(pick)
    .slice()
    .sort((a, b) => rank(a) - rank(b));

  if (!ranked.length) {
    // если флагов пока нет, просто берём первые N по кругу
    return Array.from({ length: count }, (_, i) => src[i % src.length]);
  }

  if (ranked.length >= count) return ranked.slice(0, count);

  // дозаполнение до нужного количества
  const out = ranked.slice();
  let i = 0;
  while (out.length < count) {
    out.push(ranked[i % ranked.length]);
    i++;
  }
  return out;
}

function ProductCard({
  p,
  href,
  showDiscountIcon = false,
}: {
  p: Product;
  href: string;
  showDiscountIcon?: boolean;
}) {
  const router = useRouter();

  const go = React.useCallback(() => {
    if (href && href !== "#") router.push(href);
  }, [href, router]);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      }}
      className="
        glass-border rounded-3xl
        bg-[#26292e]/[0.04]
        p-4
        flex flex-col
        ring-0 ring-inset
        transition-[box-shadow,background-color,border-color] duration-500
        hover:ring-2 hover:ring-[#9caf88]/80
        cursor-pointer
        outline-none
      "
    >
      {/* Фрейм изображения */}
      <div className="glass-border rounded-2xl bg-white/40 overflow-hidden relative h-[300px]">
        <Image
          src={withBasePath(p.imageSrc)}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-contain p-6"
        />

        {/* Описание + скидка (слева сверху) */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go();
            }}
            className="
              glass-border h-9 w-9 rounded-xl
              bg-white/55
              inline-flex items-center justify-center
              text-[#26292e]/70 hover:text-[#26292e]
              transition-colors duration-300
            "
            aria-label="Описание товара"
            title="Описание"
          >
            <FileText className="h-5 w-5" />
          </button>

          {showDiscountIcon ? (
            <div
              className="
                glass-border h-9 w-9 rounded-xl
                bg-white/55
                inline-flex items-center justify-center
                text-[#c6cf13]
              "
              aria-label="Скидка"
              title="Скидка"
            >
              <BadgePercent className="h-5 w-5" />
            </div>
          ) : null}
        </div>

        {/* Избранное (справа сверху) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: сюда потом подключим избранное из стора/пользователя
          }}
          className="
            absolute right-3 top-3
            glass-border h-9 w-9 rounded-xl
            bg-white/55
            inline-flex items-center justify-center
            text-[#26292e]/70 hover:text-[#c6cf13]
            transition-colors duration-300
          "
          aria-label="Добавить в избранное"
          title="В избранное"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Цена | разделитель | корзина */}
      <div className="mt-4 grid grid-cols-[1fr_28px_1fr] items-stretch">
        <div className="glass-border rounded-2xl bg-white/35 h-[64px] flex items-center justify-center text-center">
          <span className="text-[22px] leading-none font-semibold text-[#9caf88] tabular-nums">
            {formatRub(p.priceRub)}
          </span>
        </div>

        <div className="flex items-center justify-center">
          <span className="h-10 w-px bg-white/70" />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: сюда потом подключим add-to-cart
          }}
          className="
            glass-border rounded-2xl
            bg-[#c6cf13]
            h-[64px]
            flex items-center justify-center gap-4
            text-[#26292e]
            group/cart
          "
          aria-label="Добавить в корзину"
        >
          <ArrowRight
            className="
              h-6 w-6
              group-hover/cart:animate-[arrowWiggle_0.9s_ease-in-out_infinite]
              motion-reduce:animate-none
            "
          />
          <ShoppingCart className="h-6 w-6" />
        </button>
      </div>

      {/* Бренд (hover строго по тексту) */}
      <div className="mt-4 text-[16px] leading-snug font-normal text-[#26292e]">
        <span className="hover:text-[#9caf88] transition-colors duration-500">
          «{p.brand}»
        </span>
      </div>

      {/* Название (1 строка + ...) */}
      <div className="mt-1 text-[16px] leading-snug text-[#26292e]/40 truncate">
        <span className="hover:text-[#9caf88] transition-colors duration-500">
          {p.title}
        </span>
      </div>
    </div>
  );
}

export function HomeProductsGrid({
  products = (STORE_PRODUCTS as Product[]) ?? [],
  miniBanners = (STORE_MINI_BANNERS as MiniBanner[]) ?? [],
  finalBannerSrc = (STORE_FINAL_BANNER_SRC as string) ?? "/banners/final.png",
}: {
  products?: Product[];
  miniBanners?: MiniBanner[];
  finalBannerSrc?: string;
}) {
  const items12 = React.useMemo(() => {
    const src = (products ?? []).filter(Boolean);
    if (!src.length) return [];
    return takeRanked({
      src,
      count: 12,
      pick: (p) => !!p.showOnHome,
      rank: (p) => clampRank(p.homeRank),
    });
  }, [products]);

  const items8 = React.useMemo(() => {
    const src = (products ?? []).filter(Boolean);
    if (!src.length) return [];
    return takeRanked({
      src,
      count: 8,
      pick: (p) => !!p.showInMega,
      rank: (p) => clampRank(p.megaRank),
    });
  }, [products]);

  return (
    <section className="w-full">
      {/* 4x3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items12.map((p, i) => {
          const href = p.href ?? "#";
          return <ProductCard key={`${p.id}-home-${i}`} p={p} href={href} />;
        })}
      </div>

      {/* Мини-баннеры 4 в ряд */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {miniBanners.slice(0, 4).map((b, i) => {
          const content = b.src ? (
            <Image
              src={withBasePath(b.src)}
              alt={b.alt ?? `Мини-баннер ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-fg/40 text-sm">
              Мини-баннер {i + 1}
            </div>
          );

          const frame = (
            <div className="glass-border rounded-3xl h-[320px] overflow-hidden relative">
              {content}
            </div>
          );

          return b.href ? (
            <Link key={b.id} href={b.href} className="block">
              {frame}
            </Link>
          ) : (
            <div key={b.id}>{frame}</div>
          );
        })}
      </div>

      {/* Заголовок */}
      <div className="mt-4 text-[22px] text-[#26292e] font-semibold">
        <span className="hover:text-[#9caf88] transition-colors duration-700">
          Специальное предложение
        </span>
      </div>

      {/* 4x2 */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items8.map((p, i) => {
          const href = p.href ?? "#";
          return (
            <ProductCard
              key={`${p.id}-mega-${i}`}
              p={p}
              href={href}
              showDiscountIcon
            />
          );
        })}
      </div>

      {/* Финальный баннер */}
      <div className="mt-8">
        <div className="glass-border rounded-3xl overflow-hidden relative w-full h-[400px]">
          <Image
            src={withBasePath ("/banners/final.png")}
            alt="Финальный баннер"
            fill
            priority={false}
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
