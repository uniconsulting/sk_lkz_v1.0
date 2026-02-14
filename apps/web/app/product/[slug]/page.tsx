export default function ProductPage({ params }: { params: { slug: string } }) {
  return <main className="p-6">Товар: {params.slug}</main>;
}
