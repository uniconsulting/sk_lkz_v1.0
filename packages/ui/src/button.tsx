import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{ className?: string }>;

export function Button({ children, className }: ButtonProps) {
  return <button className={className ?? ''}>{children}</button>;
}
