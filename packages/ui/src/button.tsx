import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react';

type ButtonProps = PropsWithChildren<{
  className?: string;
}> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'disabled'>;

export function Button({ children, onClick, type = 'button', disabled = false, className = '' }: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trim()}
    >
      {children}
    </button>
  );
}
