import * as React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: 'default' | 'strong';
  radius?: 's' | 'm' | 'l';
};

export function Card({
  tone = 'default',
  radius = 'l',
  className = '',
  ...props
}: CardProps) {
  const toneClass = tone === 'strong' ? 'glass-strong' : 'glass';
  const radiusClass = radius === 's' ? 'rounded-s' : radius === 'm' ? 'rounded-m' : 'rounded-l';

  return (
    <div
      className={`${toneClass} glass-border ${radiusClass} ${className}`}
      {...props}
    />
  );
}
