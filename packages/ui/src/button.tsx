import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'inline-flex items-center justify-center rounded-2xl px-4 py-2',
        'border border-fg/10 bg-bg/60 backdrop-blur',
        'hover:bg-bg/80 transition',
        className,
      ].join(' ')}
    />
  );
}
