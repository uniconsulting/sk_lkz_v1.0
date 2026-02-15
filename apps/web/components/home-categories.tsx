import Link from "next/link";
import { ArrowRight, Home, Building2, PaintRoller } from "lucide-react";

export type HomeCategory = {
  title: string;
  subtitle: string;
  countText: string;
  href: string;
  icon: React.ReactNode;
};

export type HomeCategoriesProps = {
  items?: HomeCategory[];
};

const DEFAULT_ITEMS: HomeCategory[] = [
  {
    title: "Краски для интерьера",
    subtitle: "стен | потолка | печей и каминов",
    countText: "36 товаров",
    href: "#",
    icon: <Home className="h-6 w-6" aria-hidden />,
  },
  {
    title: "Краски для фасада",
    subtitle: "для всех типов покрытия",
    countText: "19 товаров",
    href: "#",
    icon: <Building2 className="h-6 w-6" aria-hidden />,
  },
  {
    title: "Инструменты и расходники",
    subtitle: "кисти | валики | растворители...",
    countText: "23 товара",
    href: "#",
    icon: <PaintRoller className="h-6 w-6" aria-hidden />,
  },
];

export function HomeCategories({ items = DEFAULT_ITEMS }: HomeCategoriesProps) {
  return (
    <section className="w-full">
      {/* ширину задаёт Container на странице, внутри НЕ ставим Container/max-w */}
      <div className="w-full flex flex-col lg:flex-row items-stretch">
        {items.map((item, idx) => (
          <div key={item.title} className="contents">
            {/* CARD */}
            <div className="flex-1 min-w-0">
              <Link
                href={item.href}
                className="group block h-full rounded-3xl bg-[#26292e] text-white
                           glass-border overflow-hidden
                           transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Было p-10 -> делаем ниже, чтобы карточка стала компактнее */}
                <div className="h-full p-8 flex flex-col">
                  <div
                    className="h-12 w-12 rounded-2xl bg-accent1 text-white
                               inline-flex items-center justify-center"
                  >
                    {item.icon}
                  </div>

                  {/* Было mt-8 -> делаем ниже */}
                  <div className="mt-6">
                    {/* Было text-2xl (24px) -> делаем 22px */}
                    <div className="text-[22px] font-semibold leading-tight">
                      {item.title}
                    </div>
                    <div className="mt-3 text-base text-white/35">
                      {item.subtitle}
                    </div>
                  </div>

                  {/* низ компактнее */}
                  <div className="mt-auto pt-8 flex items-center gap-5 text-accent1">
                    <span className="text-lg">Перейти</span>

                    <span
                      className="h-9 w-14 rounded-full border border-accent1/35
                                 inline-flex items-center justify-center
                                 transition-colors duration-300 group-hover:border-accent1"
                      aria-hidden
                    >
                      <ArrowRight className="h-5 w-5" />
                    </span>

                    <span className="text-lg">{item.countText}</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* SEPARATOR (между карточками) */}
            {idx !== items.length - 1 && (
              <div
                className="hidden lg:block w-px bg-dark/10 mx-6 my-8 self-stretch"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
