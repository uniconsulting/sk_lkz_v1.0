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
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 12).map((p) => {
          const href = p.href ?? "#";

          return (
            <Link key={p.id} href={href} className="block group">
              {/* Внешний фрейм */}
              <div
                className="
                  glass-border rounded-3xl
                  bg-[#26292e]/[0.06]
                  p-4
                  h-[520px]
                  flex flex-col
                  transition-colors duration-500
                  group-hover:glass-border-accent2
                "
              >
                {/* Фрейм изображения */}
                <div
                  className="
                    glass-border rounded-2xl
                    bg-white/40
                    overflow-hidden
                    relative
                    h-[300px]
                  "
                >
                  <Image
                    src={withBasePath(p.imageSrc)}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-contain p-6"
                    priority={false}
                  />

                  {/* Кнопка "Описание" (ссылка на товар) */}
                  <Link
                    href={href}
                    onClick={(e) => e.stopPropagation()}
                    className="
                      absolute left-3 top-3
                      glass-border
                      h-9 w-9 rounded-xl
                      bg-white/55
                      inline-flex items-center justify-center
                      text-[#26292e]/70
                      hover:text-[#26292e]
                      transition-colors duration-300
                    "
                    aria-label="Описание товара"
                    title="Описание"
                  >
                    <FileText className="h-5 w-5" />
                  </Link>

                  {/* Кнопка "Избранное" */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // позже подключишь избранное
                    }}
                    className="
                      absolute right-3 top-3
                      glass-border
                      h-9 w-9 rounded-xl
                      bg-white/55
                      inline-flex items-center justify-center
                      text-[#26292e]/70
                      hover:text-accent1
                      transition-colors duration-300
                    "
                    aria-label="Добавить в избранное"
                    title="В избранное"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                {/* Нижняя строка: цена | разделитель | корзина */}
                <div className="mt-4 grid grid-cols-[1fr_1px_1fr] items-stretch">
                  <div
                    className="
                      glass-border rounded-2xl
                      bg-white/35
                      h-[64px]
                      flex items-center px-5
                    "
                  >
                    <span className="text-[22px] leading-none font-semibold text-[#9caf88]">
                      {formatRub(p.priceRub)}
                    </span>
                  </div>

                  {/* разделитель (обязательный) */}
                  <div className="mx-3 w-px bg-white/70" />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      // add-to-cart позже
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
                    <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover/cart:animate-arrow-wiggle" />
                    <ShoppingCart className="h-6 w-6" />
                  </button>
                </div>

                {/* Бренд */}
                <div
                  className="
                    mt-4 text-[16px] leading-snug font-normal text-[#26292e]
                    transition-colors duration-500
                    group-hover:text-accent1
                  "
                >
                  «{p.brand}»
                </div>

                {/* Название (1 строка, троеточие) */}
                <div
                  className="
                    mt-1 text-[16px] leading-snug text-[#26292e]/40 truncate
                    transition-colors duration-500
                    group-hover:text-accent1
                  "
                >
                  {p.title}
                </div>

                <div className="flex-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Локальные анимации */}
      <style jsx global>{`
        /* 1) glass-border -> accent2 на hover (нужно, чтобы у тебя был такой класс в globals.css)
           Если нет, ниже дам минимальный вариант */
        /* 3) wiggle для стрелки */
        @keyframes arrow-wiggle {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-arrow-wiggle {
          animation: arrow-wiggle 0.9s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
