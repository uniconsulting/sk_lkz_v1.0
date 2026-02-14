import Link from 'next/link';
import { mockProducts } from '../_mock/products';

export default function CatalogPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">Каталог</h1>

      <ul className="mt-4 space-y-2">
        {mockProducts.map((p) => (
          <li key={p.slug}>
            <Link className="text-primary hover:underline" href={`/product/${p.slug}/`}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
