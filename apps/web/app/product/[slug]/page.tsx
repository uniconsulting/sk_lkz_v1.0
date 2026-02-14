import { mockProducts } from '../../_mock/products';

export const dynamicParams = false;

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    return <main className="p-4">Товар не найден</main>;
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">{product.title}</h1>
      <div className="mt-2 text-fg/70">Slug: {product.slug}</div>
      <div className="mt-4">Цена: {product.price} ₽</div>
    </main>
  );
}
