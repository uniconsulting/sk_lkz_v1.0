"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt?: string; href?: string };

const DEFAULT_SLIDES: Slide[] = [
  { src: "/banners/01.png", alt: "Баннер 1" },
  { src: "/banners/02.png", alt: "Баннер 2" },
  { src: "/banners/03.png", alt: "Баннер 3" },
  { src: "/banners/04.png", alt: "Баннер 4" },
  { src: "/banners/05.png", alt: "Баннер 5" },
  { src: "/banners/06.png", alt: "Баннер 6" },
];

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

// Форма: rounded + “мягкая выемка” слева/справа (без острых стыков)
function buildBannerClipPath() {
  // Все значения в диапазоне 0..1 (objectBoundingBox)
  const r = 0.055; // радиус скругления углов (от ширины/высоты)
  const notchW = 0.065; // глубина выемки внутрь
  const notchH = 0.36; // высота выемки
  const notchY = 0.5; // центр по вертикали
  const ns = notchY - notchH / 2; // start
  const ne = notchY + notchH / 2; // end
  const k = notchH * 0.22; // “мягкость” (чем меньше, тем резче)

  // Важно: делаем кривые так, чтобы вход/выход имели вертикальную касательную => без “углов”
  return `
    M ${r} 0
    H ${1 - r}
    A ${r} ${r} 0 0 1 1 ${r}

    V ${ns}
    C 1 ${ns + k} ${1 - notchW} ${notchY - k} ${1 - notchW} ${notchY}
    C ${1 - notchW} ${notchY + k} 1 ${ne - k} 1 ${ne}

    V ${1 - r}
    A ${r} ${r} 0 0 1 ${1 - r} 1
    H ${r}
    A ${r} ${r} 0 0 1 0 ${1 - r}

    V ${ne}
    C 0 ${ne - k} ${notchW} ${notchY + k} ${notchW} ${notchY}
    C ${notchW} ${notchY - k} 0 ${ns + k} 0 ${ns}

    V ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  `;
}

export function HomeBanner({
  slides = DEFAULT_SLIDES,
  intervalMs = 10_000,
}: {
  slides?: Slide[];
  intervalMs?: number;
}) {
  const clipId = React.useId();
  const safeSlides = slides?.length ? slides : DEFAULT_SLIDES;

  const [active, setActive] = React.useState(0);
  const total = safeSlides.length;

  const next = React.useCallback(() => {
    if (total < 2) return;
    setActive((v) => (v + 1) % total);
  }, [total]);

  const prev = React.useCallback(() => {
    if (total < 2) return;
    setActive((v) => (v - 1 + total) % total);
  }, [total]);

  React.useEffect(() => {
    if (total < 2) return;
    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [next, intervalMs, total]);

  const clipPathD = React.useMemo(() => buildBannerClipPath(), []);

  return (
    <div className="relative">
      {/* SVG clipPath: выемки являются частью формы баннера */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={clipPathD} />
          </clipPath>
        </defs>
      </svg>

      {/* Баннер */}
      <div
        className="glass-border rounded-3xl overflow-hidden relative h-[360px]"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        {safeSlides.map((s, idx) => (
          <Image
            key={s.src}
            src={withBasePath(s.src)}
            alt={s.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            priority={idx === 0}
            className={
              "object-cover transition-opacity duration-700 ease-out " +
              (idx === active ? "opacity-100" : "opacity-0")
            }
          />
        ))}
      </div>

      {/* Стрелки: без “кружков поверх”. Они сидят в выемке (там прозрачность, виден bg страницы). */}
      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущий баннер"
        className="absolute left-0 top-1/2 -translate-y-1/2
                   h-14 w-14 rounded-full
                   inline-flex items-center justify-center
                   text-dark/60 hover:text-accent1
                   transition-colors duration-500
                   bg-transparent border-0 shadow-none
                   focus:outline-none focus-visible:ring-0"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Следующий баннер"
        className="absolute right-0 top-1/2 -translate-y-1/2
                   h-14 w-14 rounded-full
                   inline-flex items-center justify-center
                   text-dark/60 hover:text-accent1
                   transition-colors duration-500
                   bg-transparent border-0 shadow-none
                   focus:outline-none focus-visible:ring-0"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Точки: строго под баннером */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {safeSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`Слайд ${idx + 1}`}
            className={
              "h-2 w-2 rounded-full transition " +
              (idx === active ? "bg-accent1" : "bg-dark/15")
            }
          />
        ))}
      </div>
    </div>
  );
}
