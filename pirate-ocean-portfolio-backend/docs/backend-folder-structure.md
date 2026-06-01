# Backend Repository Folder Structure
## Enterprise-Grade Architecture (Node.js + TypeScript + Fastify + Prisma)

```text
pirate-ocean-backend/
│
├── docs/
│   ├── api/
│   ├── architecture/
│   ├── database/
│   └── deployment/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── timeline/
│   │   ├── achievements/
│   │   ├── contact/
│   │   ├── assistant/
│   │   ├── media/
│   │   ├── analytics/
│   │   └── notifications/
│   │
│   ├── core/
│   │   ├── database/
│   │   ├── cache/
│   │   ├── queue/
│   │   ├── logger/
│   │   ├── events/
│   │   ├── security/
│   │   ├── mail/
│   │   ├── storage/
│   │   ├── ai/
│   │   └── realtime/
│   │
│   ├── common/
│   │   ├── constants/
│   │   ├── enums/
│   │   ├── exceptions/
│   │   ├── middleware/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   ├── validators/
│   │   ├── guards/
│   │   └── helpers/
│   │
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── db.config.ts
│   │   ├── auth.config.ts
│   │   ├── cloudinary.config.ts
│   │   ├── resend.config.ts
│   │   └── ai.config.ts
│   │
│   ├── shared/
│   │   ├── dto/
│   │   ├── interfaces/
│   │   ├── types/
│   │   └── contracts/
│   │
│   ├── jobs/
│   │   ├── email/
│   │   ├── analytics/
│   │   ├── cleanup/
│   │   └── ai/
│   │
│   ├── routes/
│   │   ├── v1/
│   │   ├── v2/
│   │   └── index.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── mocks/
│
├── scripts/
│   ├── seed.ts
│   ├── backup.ts
│   ├── migrate.ts
│   └── cleanup.ts
│
├── uploads/
│
├── .env
├── .env.example
├── .env.local
│
├── Dockerfile
├── docker-compose.yml
│
├── package.json
├── tsconfig.json
├── tsconfig.build.json
│
├── eslint.config.js
├── prettier.config.js
│
└── README.md
```

---

## Recommended Module Structure

```text
modules/
│
├── users/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── dto/
│   ├── entities/
│   ├── validators/
│   ├── mappers/
│   ├── interfaces/
│   └── index.ts
```

---

## Request Flow

```text
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Prisma
    │
    ▼
PostgreSQL
```

---

## API Versioning

```text
/api/v1/auth
/api/v1/users
/api/v1/projects
/api/v1/contact
```

Future:

```text
/api/v2/*
```

---

## Environment Variables

```env
NODE_ENV=development
PORT=3001

DATABASE_URL=

JWT_SECRET=
JWT_EXPIRES_IN=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRES_IN=

OPENAI_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RESEND_API_KEY=

REDIS_URL=

SENTRY_DSN=

FRONTEND_URL=
```

---

## Recommended Production Stack

- Node.js 22
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation
- Redis Cache
- BullMQ Queues
- Cloudinary Storage
- Resend Email
- Pino Logger
- OpenAI Integration
- Docker
- GitHub Actions CI/CD

---

## Architecture Goals

- Clean Architecture
- Modular Monolith Design
- Enterprise Scalability
- API Versioning
- Testability
- Cloud-Native Deployment
- AI-Ready Infrastructure
- Realtime Feature Support
- Background Job Processing
- Production Monitoring & Observability
