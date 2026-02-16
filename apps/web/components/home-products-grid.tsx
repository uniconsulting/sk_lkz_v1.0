import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShoppingCart,
  Heart,
  FileText,
  BadgePercent,
} from "lucide-react";

type Product = {
  id: string;
  href?: string;
  imageSrc: string;
  brand: string;
  title: string;
  priceRub: number;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    imageSrc: "/products/p1.png",
    brand: "Симбирские краски",
    title: 'Интерьерная краска "Премиум"',
    priceRub: 2890,
    href: "/product/p1",
  },
  {
    id: "p2",
    imageSrc: "/products/p2.png",
    brand: "Симбирские краски",
    title: 'Фасадная краска "Фасад-Про"',
    priceRub: 3240,
    href: "/product/p2",
  },
  {
    id: "p3",
    imageSrc: "/products/p3.png",
    brand: "Симбирские краски",
    title: "Краска для дерева и металла, коричневая",
    priceRub: 1890,
    href: "/product/p3",
  },
  {
    id: "p4",
    imageSrc: "/products/p4.png",
    brand: "Симбирские краски",
    title: "Грунтовка глубокого проникновения",
    priceRub: 1240,
    href: "/product/p4",
  },
];

type MiniBanner = { id: string; src?: string; alt?: string; href?: string };

// пока пустые рамки, но сразу заложил массив (если потом решишь класть картинки в /public/mini-banners)
const DEFAULT_MINI_BANNERS: MiniBanner[] = [
  { id: "m1", src: "/mini-banners/01.png", alt: "Мини-баннер 1" },
  { id: "m2", src: "/mini-banners/02.png", alt: "Мини-баннер 2" },
  { id: "m3", src: "/mini-banners/03.png", alt: "Мини-баннер 3" },
  { id: "m4", src: "/mini-banners/04.png", alt: "Мини-баннер 4" },
];

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function formatRub(v: number) {
  return new Intl.NumberFormat("ru-RU").format(v) + " ₽";
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
  return (
    <Link href={href} className="block">
      <div
        className="
          glass-border rounded-3xl
          bg-[#26292e]/[0.04]
          p-4
          flex flex-col
          ring-0 ring-inset
          transition-[box-shadow,background-color,border-color] duration-500
          hover:ring-2 hover:ring-[#9caf88]/80
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
            <Link
              href={href}
              onClick={(e) => e.stopPropagation()}
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
            </Link>

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

          {/* отдельная колонка под разделитель + воздух */}
          <div className="flex items-center justify-center">
            <span className="h-10 w-px bg-white/70" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
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
    </Link>
  );
}

export function HomeProductsGrid({
  products = DEFAULT_PRODUCTS,
  miniBanners = DEFAULT_MINI_BANNERS,
}: {
  products?: Product[];
  miniBanners?: MiniBanner[];
}) {
  const items12 = React.useMemo(() => {
    const src = products?.length ? products : [];
    if (!src.length) return [];
    return Array.from({ length: 12 }, (_, i) => src[i % src.length]);
  }, [products]);

  const items8 = React.useMemo(() => {
    const src = products?.length ? products : [];
    if (!src.length) return [];
    return Array.from({ length: 8 }, (_, i) => src[i % src.length]);
  }, [products]);

  return (
    <section className="w-full">
      {/* 4x3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items12.map((p, i) => {
          const href = p.href ?? "#";
          return <ProductCard key={`${p.id}-12-${i}`} p={p} href={href} />;
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
      <div className="mt-4">
        <div className="text-[22px] text-[#26292e] hover:text-[#9caf88] transition-colors duration-700">
          Специальное предложение
        </div>
      </div>

      {/* 4x2 */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items8.map((p, i) => {
          const href = p.href ?? "#";
          return (
            <ProductCard
              key={`${p.id}-8-${i}`}
              p={p}
              href={href}
              showDiscountIcon
            />
          );
        })}
      </div>
    </section>
  );
}
