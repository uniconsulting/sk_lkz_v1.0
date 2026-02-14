import * as React from 'react';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'primary' | 'accent1' | 'accent2' | 'neutral';
};

export function Badge({ variant = 'neutral', className = '', ...props }: BadgeProps) {
  const v =
    variant === 'primary'
      ? 'bg-primary/15 text-primary'
      : variant === 'accent1'
      ? 'bg-accent1/15 text-accent1'
      : variant === 'accent2'
      ? 'bg-accent2/20 text-accent2'
      : 'bg-fg/10 text-fg';

  return (
    <span
      className={`inline-flex items-center rounded-s px-2 py-1 text-xs font-medium ${v} ${className}`}
      {...props}
    />
  );
}
