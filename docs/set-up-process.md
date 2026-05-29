# PROCESS REMAING FROM 15th step
# Pirate Ship + Ocean Portfolio — Initial Project Setup 

---

# 1. Create Project

## Create Next.js Project

```bash
pnpm create next-app@latest pirate-ocean-portfolio
```

---

# 2. Recommended Setup Options

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

# 3. Move Into Project

```bash
cd pirate-ocean-portfolio
```

---

# 4. Install Core Dependencies

## UI & Styling

```bash
pnpm add clsx tailwind-merge tailwindcss-animate
```

---

## shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

### Recommended Answers

| Question | Answer |
|---|---|
| Style | Default |
| Base Color | Slate |
| CSS Variables | Yes |
| Tailwind Config | tailwind.config.ts |
| Components Alias | @/components |
| Utils Alias | @/lib/utils |

---

# 5. Install Animation System

```bash
pnpm add framer-motion gsap @studio-freight/lenis
```

---

# 6. Install Three.js Stack

```bash
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing
```

---

# 7. Install State Management

```bash
pnpm add zustand
```

---

# 8. Install Forms & Validation

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

---

# 9. Install API & Data Tools

```bash
pnpm add axios @tanstack/react-query
```

---

# 10. Install Authentication

```bash
pnpm add next-auth
```

---

# 11. Install Database Stack

```bash
pnpm add prisma @prisma/client
```

---

# 12. Initialize Prisma

```bash
npx prisma init
```

---

# 13. Install Content System

```bash
pnpm add contentlayer next-contentlayer gray-matter
```

---

# 14. Install Audio System

```bash
pnpm add howler
```

---

# 15. Install Particles System

```bash
pnpm add @tsparticles/react tsparticles
```

---

# 16. Install Icons

```bash
pnpm add lucide-react
```

---

# 17. Install Utility Packages

```bash
pnpm add dayjs
```

---

# 18. Install SEO Packages

```bash
pnpm add next-seo
```

---

# 19. Install Monitoring & Analytics

```bash
pnpm add @vercel/analytics
```

---

# 20. Install Email System

```bash
pnpm add resend
```

---

# 21. Install Testing Stack

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

---

# 22. Install Playwright

```bash
pnpm add -D @playwright/test
```

Initialize:

```bash
npx playwright install
```

---

# 23. Install Code Quality Tools

```bash
pnpm add -D prettier eslint-config-prettier husky lint-staged commitlint @commitlint/config-conventional
```

---

# 24. Initialize Husky

```bash
npx husky init
```

---

# 25. Create Environment Files

## Create

```txt
.env
.env.local
.env.example
```

---

# 26. Configure Path Aliases

## tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

# 27. Recommended Root Folder Structure

```txt
pirate-ocean-portfolio/
│
├── public/
│
├── docs/
│
├── prisma/
│
├── src/
│   │
│   ├── app/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── animations/
│   │   ├── 3d/
│   │   └── effects/
│   │
│   ├── features/
│   │   ├── landing/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── timeline/
│   │   ├── contact/
│   │   ├── achievements/
│   │   └── assistant/
│   │
│   ├── lib/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── animations/
│   │   ├── audio/
│   │   ├── validations/
│   │   ├── api/
│   │   └── seo/
│   │
│   ├── services/
│   │
│   ├── store/
│   │
│   ├── styles/
│   │
│   ├── providers/
│   │
│   ├── config/
│   │
│   ├── content/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── audio/
│   │   ├── shaders/
│   │   ├── models/
│   │   └── fonts/
│   │
│   ├── types/
│   │
│   └── middleware/
│
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── unit/
│
├── .husky/
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 28. Recommended App Router Structure

```txt
src/app/
│
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   ├── projects/
│   ├── contact/
│   └── layout.tsx
│
├── api/
│
├── globals.css
├── layout.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

---

# 29. Create Design System Foundation

## Create

```txt
src/styles/
│
├── globals.css
├── theme.css
├── animations.css
├── typography.css
└── variables.css
```

---

# 30. Create Global Theme Tokens

## Add

- Ocean Colors
- Fog Colors
- Gold Accent Colors
- Shadow Tokens
- Animation Durations
- Glow Effects
- Typography Scale
- Border Radius Systempnpm add next-auth
- Z-Index Layers

---

# 31. Setup Git Repository

```bash
git init
```

---

# 32. Create Initial Git Branches

```bash
main
develop
feature/*
```

---

# 33. Create Initial Documentation

```txt
docs/
│
├── 00-project-vision.md
├── 01-design-system.md
├── 02-folder-structure.md
├── 03-animation-system.md
├── 04-component-guidelines.md
├── 05-performance-rules.md
└── 06-roadmap.md
```

---

# 34. Recommended Development Order

## Phase 1

- Setup architecture
- Configure theme system
- Configure layout system
- Setup reusable UI components

---

## Phase 2

- Build landing page
- Build ocean environment
- Build navigation system

---

## Phase 3

- Add animations
- Add cinematic transitions
- Add interaction systems

---

## Phase 4

- Build feature sections
- Build AI assistant
- Build project showcases

---

## Phase 5

- Performance optimization
- Mobile optimization
- Accessibility improvements

---

# 35. Recommended Initial Features

## First Features To Build

- Navbar
- Hero Section
- Ocean Background
- Ship Animation
- Scroll System
- Theme Tokens
- Audio Toggle
- Responsive Layout

---

# 36. Recommended Deployment Stack

| Service | Usage |
|---|---|
| Vercel | Frontend hosting |
| Neon | PostgreSQL hosting |
| Cloudinary | Media storage |
| Resend | Email service |
| Cloudflare | CDN & DNS |

---

# 37. Final Goal

Build:
- cinematic experience
- immersive storytelling
- production-grade architecture
- portfolio + product hybrid
- memorable developer identity