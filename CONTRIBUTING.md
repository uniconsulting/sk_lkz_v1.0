# Contributing

## Requirements
- Node.js 20 (`.nvmrc`)
- pnpm 9+
- Docker + Docker Compose

## Workflow
1. Создайте ветку от `main`.
2. Следуйте conventional commits (`feat:`, `fix:`, `chore:` и т.д.).
3. Перед PR выполните:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm build`
4. Откройте PR по шаблону.
