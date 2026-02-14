"use client";

import * as React from "react";
import Image from "next/image";

type Slide = {
  src: string;
  alt: string;
  href?: string; // на будущее, если баннер кликабельный
};

const DEFAULT_SLIDES: Slide[] = [
  { src: "/banners/01.jpg", alt: "Баннер 1" },
  { src: "/banners/02.jpg", alt: "Баннер 2" },
  { src: "/banners/03.jpg", alt: "Баннер 3" },
  { src: "/banners/04.jpg", alt: "Баннер 4" },
  { src: "/banners/05.jpg", alt: "Баннер 5" },
  { src: "/banners/06.jpg", alt: "Баннер 6" },
];

export function HomeBanner({
  slides = DEFAULT_SLIDES,
  intervalMs = 10_000,
}: {
  slides?: Slide[];
  intervalMs?: number;
}) {
  const safeSlides = slides?.length ? slides : DEFAULT_SLIDES;
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (safeSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % safeSlides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [safeSlides.length, intervalMs]);

  const goTo = (idx: number) => setActive(idx);

  return (
    <div className="w-full">
      <div
        className={[
          "relative mx-auto w-full max-w-[1416px]",
          "aspect-[1416/400] overflow-hidden",
          "rounded-3xl glass-border",
          "bg-white/30 dark:bg-white/10",
        ].join(" ")}
      >
        {safeSlides.map((s, idx) => {
          const isActive = idx === active;

          const layer = (
            <div
              className={[
                "absolute inset-0",
                "transition-opacity duration-[900ms] ease-out",
                isActive ? "opacity-100" : "opacity-0 pointer-events-none",
              ].join(" ")}
              aria-hidden={!isActive}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 1416px"
                className="object-cover"
              />
            </div>
          );

          if (s.href) {
            return (
              <a key={s.src} href={s.href} aria-label={s.alt}>
                {layer}
              </a>
            );
          }

          return <React.Fragment key={s.src}>{layer}</React.Fragment>;
        })}

        {/* точки навигации (можно убрать, если не нужны) */}
        {safeSlides.length > 1 ? (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {safeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Перейти к баннеру ${i + 1}`}
                className={[
                  "h-2 w-2 rounded-full",
                  "transition-all duration-300",
                  i === active ? "bg-accent2" : "bg-dark/20",
                ].join(" ")}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
