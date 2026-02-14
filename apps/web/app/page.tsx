'use client';

import { Badge, BentoGrid, BentoTile, Card, Container, IconButton, Input, Switch } from '@sk/ui';
import { useTheme } from './_providers/theme-provider';

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="accent1">Accent1</Badge>
          <Badge variant="accent2">Accent2</Badge>
        </div>

        <Switch
          checked={theme === 'dark'}
          onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
          label="Тёмная тема"
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Input placeholder="Умный поиск и не только..." className="w-full" />
        <IconButton aria-label="Калькулятор">⌁</IconButton>
        <IconButton aria-label="Избранное">♡</IconButton>
      </div>

      <BentoGrid className="mt-6">
        <BentoTile col="md:col-span-7">
          <Card className="p-6">
            <div className="text-lg font-semibold">Glass Card</div>
            <div className="mt-2 text-fg/70 text-sm">Проверка токенов, стекла, радиусов и отступов 4px.</div>
          </Card>
        </BentoTile>

        <BentoTile col="md:col-span-5">
          <Card tone="strong" className="p-6">
            <div className="text-lg font-semibold">Strong tone</div>
            <div className="mt-2 text-fg/70 text-sm">Более плотное стекло, тот же бордер и радиус.</div>
          </Card>
        </BentoTile>
      </BentoGrid>
    </Container>
  );
}
