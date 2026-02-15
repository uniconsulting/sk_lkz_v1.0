// home-banner.tsx (фрагмент обёртки и стрелок)
// ВАЖНО: стекло/бордюр оставь на OUTER-рамке, а overflow-hidden только на inner

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export function HomeBanner() {
  // ...твой стейт/таймер/массив слайдов

  return (
    <div className="w-full">
      {/* OUTER: стекло + бордюр + видимые выемки (overflow-visible) */}
      <div className="relative rounded-3xl glass-border overflow-visible">
        {/* INNER: клип контента баннера */}
        <div className="relative h-[320px] md:h-[400px] rounded-[inherit] overflow-hidden">
          {/* тут твои слайды */}
          {/* пример: */}
          {/* <Image src={slides[idx].src} alt="" fill className="object-cover" priority /> */}
        </div>

        {/* Левая стрелка: круг на 1/2 снаружи */}
        <button
          type="button"
          onClick={/* prev */}
          aria-label="Предыдущий баннер"
          className="
            absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20
            h-12 w-12 md:h-14 md:w-14 rounded-full
            bg-bg border border-dark/10
            shadow-[0_12px_28px_rgba(0,0,0,0.12)]
            grid place-items-center
            transition-transform duration-300
            hover:scale-[1.03] active:scale-[0.97]
          "
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-dark/60" />
        </button>

        {/* Правая стрелка */}
        <button
          type="button"
          onClick={/* next */}
          aria-label="Следующий баннер"
          className="
            absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20
            h-12 w-12 md:h-14 md:w-14 rounded-full
            bg-bg border border-dark/10
            shadow-[0_12px_28px_rgba(0,0,0,0.12)]
            grid place-items-center
            transition-transform duration-300
            hover:scale-[1.03] active:scale-[0.97]
          "
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-dark/60" />
        </button>
      </div>

      {/* Точки ВНЕ баннера */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {/* map по slides */}
        {/* активная: bg-accent1, остальные: bg-dark/20 */}
      </div>
    </div>
  );
}
