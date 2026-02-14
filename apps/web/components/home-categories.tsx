import Link from "next/link";
import { Container } from "@sk/ui";
import { Home, Building2, Paintbrush, ArrowRight } from "lucide-react";

type CategoryCard = {
  title: string;
  subtitle: string;
  countLabel: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const DEFAULT_CARDS: CategoryCard[] = [
  {
    title: "Краски для интерьера",
    subtitle: "стен | потолка | печей и каминов",
    countLabel: "36 товаров",
    href: "#interior",
    Icon: Home,
  },
  {
    title: "Краски для фасада",
    subtitle: "для всех типов покрытия",
    countLabel: "19 товаров",
    href: "#facade",
    Icon: Building2,
  },
  {
    title: "Инструменты и расходники",
    subtitle: "кисти | валики | растворители...",
    countLabel: "23 товара",
    href: "#tools",
    Icon: Paintbrush,
  },
];

function CategoryCardItem({ item }: { item: CategoryCard }) {
  const { title, subtitle, countLabel, href, Icon } = item;

  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-3xl glass-border",
        // делаем “как на макете”: тёмная заливка внутри
        "[--glass-fill:rgba(38,41,46,0.96)]",
        "p-8 md:p-9",
        "transition-transform duration-300 hover:-translate-y-[1px]",
      ].join(" ")}
      aria-label={title}
    >
      <div className="flex flex-col gap-6">
        {/* Иконка в зелёном квадрате */}
        <div className="h-12 w-12 rounded-2xl bg-accent1 flex items-center justify-center text-white">
          <Icon className="h-6 w-6" aria-hidden />
        </div>

        {/* Тексты */}
        <div className="space-y-3">
          <div className="text-2xl font-semibold text-white leading-tight">{title}</div>
          <div className="text-white/28 text-lg leading-snug">{subtitle}</div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-1 flex items-center gap-4 text-accent1">
          <span className="text-xl font-medium">Перейти</span>

          <span
            className={[
              "inline-flex items-center justify-center",
              "h-9 px-5 rounded-full border border-accent1/45",
              "transition-colors duration-300 group-hover:border-accent1/70",
            ].join(" ")}
            aria-hidden
          >
            <ArrowRight className="h-5 w-5" />
          </span>

          <span className="text-xl opacity-85">{countLabel}</span>
        </div>
      </div>
    </Link>
  );
}

export function HomeCategories({ cards = DEFAULT_CARDS }: { cards?: CategoryCard[] }) {
  return (
    <section className="py-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((c) => (
            <CategoryCardItem key={c.title} item={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
