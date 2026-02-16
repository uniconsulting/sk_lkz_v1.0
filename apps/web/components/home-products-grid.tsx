import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  href?: string;
  imageSrc: string;
  title: string;
  brand?: string;
  priceRub: number;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    imageSrc: "/products/p1.png",
    title: 'Интерьерная краска "Премиум"',
    priceRub: 2890,
  },
  {
    id: "p2",
    imageSrc: "/products/p2.png",
    title: 'Фасадная краска "Фасад-Про"',
    priceRub: 3240,
  },
  {
    id: "p3",
    imageSrc: "/products/p3.png",
    title: "Краска для дерева и металла (коричневая)",
    priceRub: 1890,
  },
  {
    id: "p4",
    imageSrc: "/products/p4.png",
    title: "Грунтовка глубокого проникновения",
    priceRub: 1240,
  },
  // ниже просто заглушки, замени на реальные товары/картинки
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `p${i + 5}`,
    imageSrc: `/products/p${i + 5}.png`,
    title: `Товар ${i + 5}`,
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
  brandLabel = "Симбирские краски",
}: {
  products?: Product[];
  brandLabel?: string;
}) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 12).map((p) => {
          const href = p.href ?? "#";

          return (
            <Link
              key={p.id}
              href={href}
              className="group block"
              aria-label={p.title}
            >
              {/* Внешняя карточка */}
              <div
                className="
                  relative rounded-[36px] bg-bg
                  border border-dark/10
                  shadow-[0_14px_30px_rgba(0,0,0,0.06)]
                  overflow-hidden
                  transition-transform duration-300 ease-out
                  group-hover:-translate-y-[2px]
                "
              >
                {/* Внутренняя рамка (двойной бордер) */}
                <div className="pointer-events-none absolute inset-2 rounded-[32px] border border-dark/10" />

                <div className="p-4">
                  {/* Витрина под изображение */}
                  <div
                    className="
                      relative rounded-[28px]
                      bg-dark/[0.03]
                      overflow-hidden
                      border border-dark/10
                    "
                    style={{ height: 260 }}
                  >
                    {/* лёгкая внутренняя линия как у “вставки” */}
                    <div className="pointer-events-none absolute inset-2 rounded-[24px] border border-dark/10" />

                    <div className="absolute inset-0">
                      <Image
                        src={withBasePath(p.imageSrc)}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-contain p-6"
                        priority={false}
                      />
                    </div>
                  </div>

                  {/* Цена + кнопка */}
                  <div className="mt-4">
                    <div
                      className="
                        relative rounded-[26px]
                        bg-bg
                        border border-dark/10
                        overflow-hidden
                      "
                    >
                      {/* внутренняя линия */}
                      <div className="pointer-events-none absolute inset-2 rounded-[22px] border border-dark/10" />

                      <div className="relative flex items-stretch">
                        {/* Цена */}
                        <div
                          className="
                            flex-1 px-5 py-4
                            flex items-center
                          "
                        >
                          <span className="text-[28px] leading-none font-semibold text-[#9caf88]">
                            {formatRub(p.priceRub)}
                          </span>
                        </div>

                        {/* Разделитель */}
                        <div className="w-px bg-dark/10 my-3" />

                        {/* Купить */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            // тут потом подключишь add-to-cart
                          }}
                          className="
                            w-[148px]
                            rounded-[22px]
                            m-2
                            bg-[#c6cf13]
                            text-dark
                            inline-flex items-center justify-center gap-3
                            shadow-[0_10px_22px_rgba(0,0,0,0.10)]
                            hover:opacity-95 transition
                          "
                          aria-label="Добавить в корзину"
                        >
                          {/* капсула со стрелкой */}
                          <span
                            className="
                              inline-flex items-center justify-center
                              h-10 w-14 rounded-full
                              border border-dark/25
                              bg-white/0
                            "
                          >
                            <ArrowRight className="h-5 w-5" />
                          </span>

                          <ShoppingCart className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Тексты */}
                  <div className="mt-4">
                    <div className="text-[18px] leading-snug font-semibold text-dark">
                      «{p.brand ?? brandLabel}»
                    </div>
                    <div className="mt-1 text-[18px] leading-snug text-dark/40 truncate">
                      {p.title}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
