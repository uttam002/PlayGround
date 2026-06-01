# Pirate Ship + Ocean Portfolio — Initial Project Setup

## Repo Split

- Frontend repo: `pirate-ocean-portfolio-frontend`
- Backend repo: `pirate-ocean-portfolio-backend`
- Keep UI, styling, animation, and client state in the frontend repo.
- Keep Prisma, auth, API code, email, and database wiring in the backend repo.

---

# 1. Create the Frontend App

```bash
pnpm create next-app@latest pirate-ocean-portfolio-frontend
```

Recommended options:

| Option | Value |
|---|---|
| TypeScript | Yes |
| ESLint | Yes |
| Tailwind CSS | Yes |
| src directory | Yes |
| App Router | Yes |
| Turbopack | Yes |
| Import Alias | Yes (`@/*`) |

---

# 2. Frontend Install Set

Install only UI-focused packages in the frontend repo:

```bash
pnpm add clsx tailwind-merge tailwindcss-animate framer-motion gsap @studio-freight/lenis three @react-three/fiber @react-three/drei @react-three/postprocessing zustand react-hook-form zod @hookform/resolvers axios @tanstack/react-query contentlayer next-contentlayer gray-matter howler @tsparticles/react tsparticles lucide-react dayjs next-seo @vercel/analytics
```

---

# 3. Create the Backend App

Choose a backend runtime and keep it separate from the frontend repo.

```bash
mkdir pirate-ocean-portfolio-backend
cd pirate-ocean-portfolio-backend
```

Initialize Prisma in the backend repo:

```bash
npx prisma init
```

Backend ownership:

- `prisma/schema.prisma`
- `prisma.config.ts`
- API routes or controllers
- auth setup
- email delivery
- database migrations

---

# 4. Environment Files

Frontend:

```txt
.env.local
.env.example
```

Backend:

```txt
.env
.env.example
```

---

# 5. Recommended Frontend Folder Structure

```txt
pirate-ocean-portfolio-frontend/
├── public/
├── docs/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── animations/
│   │   ├── 3d/
│   │   └── effects/
│   ├── features/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── providers/
│   ├── config/
│   ├── content/
│   ├── assets/
│   ├── types/
│   └── middleware/
├── tests/
├── .husky/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 6. Recommended Frontend App Router Structure

```txt
src/app/
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   ├── projects/
│   ├── contact/
│   └── layout.tsx
├── globals.css
├── layout.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

---

# 7. Recommended Development Order

## Phase 1

- Setup architecture
- Configure theme system
- Configure layout system
- Setup reusable UI components

## Phase 2

- Build landing page
- Build ocean environment
- Build navigation system

## Phase 3

- Add animations
- Add cinematic transitions
- Add interaction systems

## Phase 4

- Build feature sections
- Build AI assistant
- Build project showcases

## Phase 5

- Performance optimization
- Mobile optimization
- Accessibility improvements

---

# 8. Final Goal

Build:
- cinematic experience
- immersive storytelling
- production-grade architecture
- portfolio + product hybrid
- memorable developer identity
