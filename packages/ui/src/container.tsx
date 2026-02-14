import * as React from 'react';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg';
};

export function Container({ size = 'lg', className = '', ...props }: ContainerProps) {
  const max =
    size === 'sm' ? 'max-w-[960px]' : size === 'md' ? 'max-w-[1200px]' : 'max-w-[1440px]';

  return (
    <div
      className={`mx-auto w-full px-4 md:px-6 ${max} ${className}`}
      {...props}
    />
  );
}
