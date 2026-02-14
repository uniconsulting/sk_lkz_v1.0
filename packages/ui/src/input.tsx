import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={[
        'glass glass-border rounded-l px-4 py-3 text-sm',
        'placeholder:text-fg/45',
        'focus-ring',
        className,
      ].join(' ')}
      {...props}
    />
  );
});
