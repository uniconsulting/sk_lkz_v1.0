# Симбирские краски — monorepo bootstrap

## Стек
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS
- Prisma + PostgreSQL
- Vitest
- pnpm workspaces

## Структура
- `apps/web` — витрина + `/admin`
- `packages/shared` — сервисные модули-заглушки
- `packages/ui` — базовые UI-компоненты
- `packages/db` — Prisma schema, migrations, seed
- `packages/config` — общие конфиги

## Быстрый старт
1. Скопируйте `.env.example` в `.env`.
2. Установите зависимости:
   ```bash
   pnpm install
   ```
3. Поднимите БД:
   ```bash
   docker compose up -d
   ```
4. Выполните миграции:
   ```bash
   pnpm db:migrate
   ```
5. Заполните БД тестовыми данными:
   ```bash
   pnpm db:seed
   ```
6. Запустите приложение:
   ```bash
   pnpm dev
   ```

## Команды
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Дизайн-токены
Используются только 5 цветов через CSS variables и Tailwind:
- Background: `#ffffff` / dark background `#26292e`
- Primary: `#7a72e9`
- Accent1: `#9caf88`
- Accent2: `#c6cf13`
- Dark: `#26292e`

Нейтрали строятся только через прозрачности указанных цветов.

## TODO
- Подключить реальные файлы шрифта Garet (`public/fonts/*`) и обновить `@font-face`.
- Подключить production-провайдера оплаты (сейчас используется заглушка интерфейса).
