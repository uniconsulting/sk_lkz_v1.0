import Link from "next/link";
import { ArrowRight, Home, Building2, PaintRoller } from "lucide-react";

export type HomeCategory = {
  title: string;
  subtitle: string;
  countText: string; // "36 товаров"
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
      {/* Важно: никаких max-w/mx-auto/Container внутри. Ширину задаёт Container на странице */}
      <div className="w-full flex flex-col lg:flex-row items-stretch">
        {items.map((item, idx) => (
          <div key={item.title} className="flex-1 min-w-0">
            <Link
              href={item.href}
              className="group block h-full rounded-3xl bg-[#26292e] text-white
                         border border-white/10 overflow-hidden
                         transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-full p-10 flex flex-col">
                {/* Icon */}
                <div
                  className="h-14 w-14 rounded-2xl bg-accent1 text-white
                             inline-flex items-center justify-center"
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div className="mt-8">
                  <div className="text-2xl font-semibold leading-tight">
                    {item.title}
                  </div>
                  <div className="mt-4 text-lg text-white/35">
                    {item.subtitle}
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-auto pt-10 flex items-center gap-5 text-accent1">
                  <span className="text-xl">Перейти</span>

                  <span
                    className="h-10 w-16 rounded-full border border-accent1/35
                               inline-flex items-center justify-center
                               transition-colors duration-300 group-hover:border-accent1"
                    aria-hidden
                  >
                    <ArrowRight className="h-5 w-5" />
                  </span>

                  <span className="text-xl">{item.countText}</span>
                </div>
              </div>
            </Link>

            {/* Разделитель между карточками (только на lg+) */}
            {idx !== items.length - 1 && (
              <div
                className="hidden lg:block w-full"
                aria-hidden
              >
                {/* вертикальная линия между карточками */}
                <div className="pointer-events-none absolute" />
              </div>
            )}
          </div>
        ))}

        {/* Реальные разделители отдельными элементами, чтобы контролировать высоту/отступы */}
        <div className="hidden lg:block w-px bg-dark/10 mx-6 my-10" aria-hidden />
        <div className="hidden lg:block w-px bg-dark/10 mx-6 my-10" aria-hidden />
      </div>
    </section>
  );
}
