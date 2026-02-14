import React from "react";
import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${className ?? ""}`}
      aria-label="Симбирские краски"
    >
      <Image
        src="/logo1.png"
        alt="Симбирские краски"
        width={56}
        height={56}
        priority
        className="h-14 w-14 rounded-full"
      />

      <div className="leading-none">
        <div className="text-[12px] tracking-[0.18em] text-primary font-medium">
          СИМБИРСКИЕ
        </div>
        <div className="text-[22px] tracking-[0.02em] text-dark font-semibold">
          КРАСКИ
        </div>
      </div>
    </Link>
  );
}
