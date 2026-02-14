import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium',
        'transition focus:outline-none focus:ring-2 focus:ring-primary/40',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
