import * as React from 'react';
import { Container } from '../container';
import { Input } from '../input';
import { IconButton } from '../icon-button';
import { Button } from '../button';

export type StickybarProps = {
  catalogLabel?: string;
  searchPlaceholder?: string;
};

export function Stickybar({
  catalogLabel = 'каталог продукции',
  searchPlaceholder = 'умный поиск и не только...',
}: StickybarProps) {
  return (
    <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-fg/10">
      <Container className="h-20 flex items-center gap-4">
        <Button
          className="h-12 rounded-l px-5 bg-accent1/60 text-fg hover:bg-accent1/70"
          aria-label="Каталог"
        >
          <span className="mr-3 text-lg leading-none">≡</span>
          <span className="text-sm font-semibold uppercase tracking-wide">{catalogLabel}</span>
        </Button>

        <div className="flex-1">
          <Input className="h-12 w-full rounded-l" placeholder={searchPlaceholder} />
        </div>

        <div className="flex items-center gap-3">
          <IconButton aria-label="Калькулятор расхода">⌁</IconButton>
          <IconButton aria-label="Избранные">♡</IconButton>
          <IconButton aria-label="Корзина">🛒</IconButton>
          <IconButton aria-label="Личный кабинет">👤</IconButton>
        </div>
      </Container>
    </div>
  );
}
