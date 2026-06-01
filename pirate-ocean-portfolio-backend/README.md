# Pirate Ocean Portfolio Backend

This repo owns backend concerns for the project:

- API endpoints and controllers
- auth and session logic
- Prisma schema and migrations
- server-side services like email
- reference backend standards in `docs/backend-standards.md`

## Local development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and set `DATABASE_URL` before running Prisma commands.

## Demo endpoints

- `GET /health`
- `GET /api/demo-voyage/entries`
- `POST /api/demo-voyage/entries`
