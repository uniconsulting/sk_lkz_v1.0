export default function ProductPage({ params }: { params: { slug: string } }) {
  return <main className="p-8">/product/{params.slug}</main>;
}
