# Backend File Map

This file explains where future backend code should live.

| Future work | Put it here | Example |
|---|---|---|
| Contact form endpoint | `src/features/contact/` | `contact.routes.ts`, `contact.controller.ts`, `contact.service.ts`, `contact.schema.ts` |
| AI navigator chat endpoint | `src/features/assistant/` | `assistant.routes.ts`, `assistant.controller.ts`, `assistant.service.ts` |
| Project showcase data API | `src/features/projects/` | `projects.routes.ts`, `projects.service.ts` |
| Auth endpoints | `src/features/auth/` | `auth.routes.ts`, `auth.controller.ts`, `auth.service.ts`, `auth.schema.ts` |
| Email provider setup | `src/lib/email.ts` | Resend client and send helpers |
| Database client | `src/lib/prisma.ts` | Prisma singleton |
| Global env config | `src/config/env.ts` | Ports, CORS, secrets, provider keys |
| Shared error helpers | `src/lib/http-error.ts` | Typed operational errors |
| Feature tests | `src/features/feature-name/*.test.ts` | Service and controller tests |

## Naming Rules

- Folders: `kebab-case`
- Files: `feature-name.layer.ts`
- Variables and functions: `camelCase`
- Types and schemas: `PascalCase` for types, `camelCaseSchema` for Zod schemas
- API routes: lower-case, kebab-case, plural collection names

## Import Rules

- Feature routes can import controllers.
- Controllers can import schemas and services.
- Services can import libraries, database clients, and types.
- Libraries must not import feature modules.
- `src/routes/index.ts` is the only place that mounts feature routers.
