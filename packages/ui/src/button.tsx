import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return <button className={className ?? ''} type={props.type ?? 'button'} {...props} />;
}
