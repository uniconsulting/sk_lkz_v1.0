import * as React from 'react';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md';
};

export function IconButton({ size = 'md', className = '', type = 'button', ...props }: IconButtonProps) {
  const s = size === 'sm' ? 'h-10 w-10 rounded-l' : 'h-12 w-12 rounded-l';

  return (
    <button
      type={type}
      className={[
        'glass glass-border focus-ring inline-flex items-center justify-center',
        'text-fg hover:bg-bg/80 transition',
        s,
        className,
      ].join(' ')}
      {...props}
    />
  );
}
