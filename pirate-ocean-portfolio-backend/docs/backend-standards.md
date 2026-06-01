# Backend Standards

These rules define how backend code should be organized in this repo.

## Folder Structure

```txt
src/
├── config/
│   └── env.ts
├── features/
│   └── feature-name/
│       ├── feature-name.routes.ts
│       ├── feature-name.controller.ts
│       ├── feature-name.service.ts
│       ├── feature-name.schema.ts
│       └── feature-name.types.ts
├── lib/
│   └── prisma.ts
├── routes/
│   └── index.ts
├── server.ts
└── index.ts
```

## File Rules

| File | Responsibility | Rules |
|---|---|---|
| `src/index.ts` | Process entry | Start the HTTP server only. Do not define routes, validation, or business logic here. |
| `src/server.ts` | Express app factory | Configure middleware, health checks, and root routers. Keep it framework setup only. |
| `src/config/env.ts` | Environment parsing | Validate env values with Zod. Export one typed `env` object. Do not read `process.env` directly elsewhere. |
| `src/routes/index.ts` | API router registry | Mount feature routers with clear prefixes like `/demo-voyage`. Do not put feature logic here. |
| `src/features/*/*.routes.ts` | Route definitions | Define HTTP method and path only. Delegate work to controllers. |
| `src/features/*/*.controller.ts` | Request/response layer | Parse request data, call services, and shape HTTP responses. No business rules or persistence logic. |
| `src/features/*/*.service.ts` | Business logic | Own use-case behavior, persistence calls, and orchestration. No Express imports. |
| `src/features/*/*.schema.ts` | Validation and DTOs | Keep Zod request schemas and inferred input types here. |
| `src/features/*/*.types.ts` | Shared feature types | Use only when types are not naturally inferred from schemas. |
| `src/lib/*` | Shared infrastructure | Keep reusable integrations like Prisma, email clients, and auth helpers here. |

## Feature Module Rules

- One feature folder should represent one product capability.
- Use kebab-case folder and file names.
- Keep API path names plural when they represent collections.
- Validate every non-trivial request body with Zod.
- Controllers return HTTP responses; services return plain data.
- Services should not know about Express `Request` or `Response`.
- Prefer small, focused functions over classes unless stateful construction is required.
- Start with in-memory demo data only for examples; real features should move persistence into Prisma-backed services.

## API Response Shape

Successful collection response:

```json
{
  "data": [],
  "meta": {}
}
```

Successful single resource response:

```json
{
  "data": {}
}
```

Validation error response:

```json
{
  "error": "VALIDATION_ERROR",
  "issues": []
}
```

## Demo Reference

Use `src/features/demo-voyage` as the reference module before building real features. It demonstrates route mounting, request validation, service orchestration, and frontend integration.
