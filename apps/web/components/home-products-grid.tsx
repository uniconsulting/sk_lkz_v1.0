import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart, Heart, FileText } from "lucide-react";

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

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function formatRub(v: number) {
  return new Intl.NumberFormat("ru-RU").format(v) + " ₽";
}

export function HomeProductsGrid({
  products = DEFAULT_PRODUCTS,
}: {
  products?: Product[];
}) {
  const items = React.useMemo(() => {
    const src = products?.length ? products : [];
    if (!src.length) return [];
    // временно заполняем 12 карточек (4x3)
    return Array.from({ length: 12 }, (_, i) => src[i % src.length]);
  }, [products]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p, i) => {
          const href = p.href ?? "#";

          return (
            <Link key={`${p.id}-${i}`} href={href} className="block">
              <div
                className="
                  glass-border rounded-3xl
                  bg-[#26292e]/[0.06]
                  p-4
                  flex flex-col
                  ring-0 ring-inset
                  transition-[box-shadow,background-color] duration-500
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

                  {/* Описание (ссылка) */}
                  <Link
                    href={href}
                    onClick={(e) => e.stopPropagation()}
                    className="
                      absolute left-3 top-3
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

                  {/* Избранное */}
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
                  <div className="glass-border rounded-2xl bg-white/35 h-[64px] flex items-center px-5">
                    <span className="text-[22px] leading-none font-semibold text-[#9caf88]">
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
                  <span className="hover:text-[#c6cf13] transition-colors duration-500">
                    «{p.brand}»
                  </span>
                </div>

                {/* Название (1 строка + ...) */}
                <div className="mt-1 text-[16px] leading-snug text-[#26292e]/40 truncate">
                  <span className="hover:text-[#c6cf13] transition-colors duration-500">
                    {p.title}
                  </span>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
