import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";

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
  },
  {
    id: "p2",
    imageSrc: "/products/p2.png",
    brand: "Симбирские краски",
    title: 'Фасадная краска "Фасад-Про"',
    priceRub: 3240,
  },
  {
    id: "p3",
    imageSrc: "/products/p3.png",
    brand: "Симбирские краски",
    title: "Краска для дерева и металла, коричневая",
    priceRub: 1890,
  },
  {
    id: "p4",
    imageSrc: "/products/p4.png",
    brand: "Симбирские краски",
    title: "Грунтовка глубокого проникновения",
    priceRub: 1240,
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `p${i + 5}`,
    imageSrc: `/products/p${i + 5}.png`,
    brand: "Симбирские краски",
    title: `Товар ${i + 5} с длинным названием для проверки обрезки`,
    priceRub: 990 + i * 250,
  })),
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
            <Link key={p.id} href={href} className="block">
              {/* 1) общий фрейм */}
              <div
                className="
                  glass-border rounded-3xl
                  bg-[#26292e]/10
                  p-4
                  h-[520px]
                  flex flex-col
                "
              >
                {/* 2) фрейм под изображение */}
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
                </div>

                {/* 3) два одинаковых фрейма + белый разделитель */}
                <div className="mt-4 grid grid-cols-[1fr_1px_1fr] items-stretch">
                  {/* левый: цена */}
                  <div
                    className="
                      glass-border rounded-2xl
                      bg-white/35
                      h-[64px]
                      flex items-center px-5
                    "
                  >
                    <span className="text-[28px] leading-none font-semibold text-[#9caf88]">
                      {formatRub(p.priceRub)}
                    </span>
                  </div>

                  {/* разделитель */}
                  <div className="mx-3 w-px bg-white/70" />

                  {/* правый: стрелка + корзина */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      // позже подключишь add-to-cart
                    }}
                    className="
                      glass-border rounded-2xl
                      bg-[#c6cf13]
                      h-[64px]
                      flex items-center justify-center gap-4
                      text-[#26292e]
                    "
                    aria-label="Добавить в корзину"
                  >
                    <ArrowRight className="h-6 w-6" />
                    <ShoppingCart className="h-6 w-6" />
                  </button>
                </div>

                {/* 4) бренд */}
                <div className="mt-4 text-[18px] leading-snug font-normal text-[#26292e]">
                  «{p.brand}»
                </div>

                {/* 5) название в одну строку, с троеточием */}
                <div className="mt-1 text-[18px] leading-snug text-[#26292e]/40 truncate">
                  {p.title}
                </div>

                {/* добивка по вертикали чтобы карточки были одинаковыми */}
                <div className="flex-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
