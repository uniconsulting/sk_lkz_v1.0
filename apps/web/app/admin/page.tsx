import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div>
      <div className="text-[22px] font-semibold text-[#26292e]">Обзор</div>
      <div className="mt-2 text-sm text-[#26292e]/60">
        На этом шаге делаем “Товары”. Остальные разделы пока заглушки.
      </div>

      <div className="mt-6">
        <Link
          href="/admin/products"
          className="glass-border rounded-2xl bg-white/35 px-4 py-3 inline-flex items-center text-sm font-semibold text-[#26292e] hover:bg-white/55 transition-colors duration-300"
        >
          Перейти в Товары
        </Link>
      </div>
    </div>
  );
}
