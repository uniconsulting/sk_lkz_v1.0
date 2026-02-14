import * as React from 'react';
import Link from 'next/link';

export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">
        СК
      </div>
      <div className="leading-tight">
        <div className="text-xs text-primary/80 tracking-wide">СИМБИРСКИЕ</div>
        <div className="text-lg font-semibold">КРАСКИ</div>
      </div>
    </Link>
  );
}
