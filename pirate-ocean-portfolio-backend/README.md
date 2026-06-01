# Pirate Ocean Portfolio Backend

This folder owns backend concerns for the project:

- Prisma schema and migrations
- auth and session logic
- API routes or controllers
- email delivery and other server-side services

The frontend repo should consume this backend through HTTP or shared contracts, but not keep database tooling in the UI project.
