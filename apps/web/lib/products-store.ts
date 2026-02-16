import raw from "../data/products.json";

export type Product = {
  id: string;
  href?: string;
  imageSrc: string;
  brand: string;
  title: string;
  priceRub: number;

  // Управление витриной
  showOnHome?: boolean;
  homeRank?: number;

  showInMega?: boolean;
  megaRank?: number;
};

const BASE: Product[] = raw as Product[];

function normalizeRank(v: unknown, fallback: number) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function byRank(field: "homeRank" | "megaRank") {
  return (a: Product, b: Product) =>
    normalizeRank(a[field], 999999) - normalizeRank(b[field], 999999);
}

function takeWithCycle(list: Product[], limit: number): Product[] {
  if (limit <= 0) return [];
  if (list.length === 0) return [];

  if (list.length >= limit) return list.slice(0, limit);

  // Дозаполняем циклом (важно для ранней стадии, когда товаров мало)
  const out: Product[] = [];
  for (let i = 0; i < limit; i++) {
    out.push(list[i % list.length]);
  }
  return out;
}

export function getAllProducts(): Product[] {
  return BASE;
}

export function getHomeProducts(limit = 12): Product[] {
  const selected = BASE.filter((p) => p.showOnHome)
    .slice()
    .sort(byRank("homeRank"));

  // если выбранных нет, fallback: первые по homeRank
  const fallback =
    selected.length > 0 ? selected : BASE.slice().sort(byRank("homeRank"));

  return takeWithCycle(fallback, limit);
}

export function getMegaProducts(limit = 8): Product[] {
  const selected = BASE.filter((p) => p.showInMega)
    .slice()
    .sort(byRank("megaRank"));

  const fallback =
    selected.length > 0 ? selected : BASE.slice().sort(byRank("megaRank"));

  return takeWithCycle(fallback, limit);
}
