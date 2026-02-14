import * as React from 'react';

export function BentoGrid({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        'grid gap-4',
        'grid-cols-1 md:grid-cols-12',
        className,
      ].join(' ')}
      {...props}
    />
  );
}

export type BentoTileProps = React.HTMLAttributes<HTMLDivElement> & {
  col?: string; /* tailwind col-span */
};

export function BentoTile({ col = 'md:col-span-6', className = '', ...props }: BentoTileProps) {
  return <div className={`${col} ${className}`} {...props} />;
}
