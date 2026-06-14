# TARGET-001 — Folder Architecture & Project Foundation Setup

## Target Metadata

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **ID**       | TARGET-001                                 |
| **Phase**    | Phase 1 — World Foundation                 |
| **Priority** | 🔴 Critical — Must be done first           |
| **Type**     | Infrastructure / Foundation                |
| **Estimated Effort** | 1–2 days                         |
| **Depends On** | Nothing — This is the root Target        |
| **Blocks**   | All other Phase 1 Targets                  |
| **Branch**   | `feature/folder-architecture-setup`        |

---

## Objective

Establish the complete, permanent folder architecture for the frontend application.

Every folder must be created with the correct name, correct placement, and a placeholder `index.ts` or `.gitkeep` file so the structure is committed to Git and visible to all developers.

This Target is the **foundation of all subsequent work**. No other Target may begin implementation until this structure exists.

---

## Background Context

The project is a 3D interactive portfolio called **The Developer's Voyage**. It uses:

- **Next.js 15** with App Router (file-based routing)
- **React Three Fiber** + **Three.js** for the 3D world engine
- **Zustand** for global state
- **Tailwind CSS** + **shadcn/ui** for UI
- **Feature-driven architecture** — code is grouped by feature, not technology category

The folder architecture must reflect feature ownership first, technical separation second.

---

## Scope

**Repository:** `pirate-ocean-portfolio-frontend`

**Root path:** `src/`

---

## Deliverables

### 1. Complete `src/` Folder Tree

Create all of the following folders. Each must contain at minimum a `.gitkeep` or an `index.ts` barrel file.

```
src/
├── app/
│   ├── (portfolio)/
│   │   └── page.tsx               ← Placeholder: renders "World is coming"
│   ├── layout.tsx                 ← Root layout (already exists — ensure correct)
│   ├── loading.tsx                ← Root loading state placeholder
│   ├── error.tsx                  ← Root error boundary placeholder
│   └── not-found.tsx              ← 404 placeholder
│
├── components/
│   ├── ui/                        ← shadcn/ui primitives (Button, Dialog, etc.)
│   │   └── .gitkeep
│   ├── common/                    ← App-wide reusable components
│   │   └── .gitkeep
│   └── layout/                   ← Layout structure components
│       └── .gitkeep
│
├── features/
│   ├── world/                     ← 3D world orchestration
│   │   └── .gitkeep
│   ├── navigation/                ← Island-to-island navigation system
│   │   └── .gitkeep
│   ├── islands/                   ← Island system (shared, generic)
│   │   └── .gitkeep
│   ├── ship/                      ← Ship feature (hub, movement)
│   │   └── .gitkeep
│   ├── ui-overlay/                ← HTML UI layer above Three.js canvas
│   │   └── .gitkeep
│   └── camera/                    ← Camera mode system
│       └── .gitkeep
│
├── three/
│   ├── core/                      ← Canvas, Renderer, Scene setup
│   │   └── .gitkeep
│   ├── world/                     ← World composition (Ocean + Ship + Islands)
│   │   └── .gitkeep
│   ├── objects/                   ← Reusable 3D objects
│   │   ├── ship/
│   │   │   └── .gitkeep
│   │   ├── island/
│   │   │   └── .gitkeep
│   │   └── environment-props/
│   │       └── .gitkeep
│   ├── environment/               ← Sky, Fog, Lighting, Atmosphere, Moon
│   │   └── .gitkeep
│   ├── effects/                   ← Post-processing (Bloom, DOF, Vignette)
│   │   └── .gitkeep
│   ├── cameras/                   ← Camera systems (Cinematic, Explore, Focus)
│   │   └── .gitkeep
│   ├── controls/                  ← Orbit / Navigation controls
│   │   └── .gitkeep
│   ├── loaders/                   ← GLB/asset loaders
│   │   └── .gitkeep
│   ├── materials/                 ← Reusable materials (ocean, ship, fog)
│   │   └── .gitkeep
│   ├── shaders/                   ← GLSL shader files
│   │   └── .gitkeep
│   └── utils/                     ← Three.js-specific utilities
│       └── .gitkeep
│
├── store/
│   ├── world.store.ts             ← Placeholder Zustand world store
│   ├── navigation.store.ts        ← Placeholder Zustand navigation store
│   └── camera.store.ts            ← Placeholder Zustand camera store
│
├── hooks/
│   └── .gitkeep
│
├── services/
│   └── .gitkeep
│
├── types/
│   ├── world.types.ts             ← Core world TypeScript types
│   ├── island.types.ts            ← Island definition types
│   ├── navigation.types.ts        ← Navigation route types
│   └── camera.types.ts            ← Camera mode types
│
├── constants/
│   ├── world.constants.ts         ← World configuration constants
│   ├── camera.constants.ts        ← Camera constants
│   ├── animation.constants.ts     ← Animation timing constants
│   └── island.constants.ts        ← Island definitions as constants
│
├── config/
│   ├── app.config.ts              ← App-level environment config
│   ├── world.config.ts            ← World runtime config
│   └── navigation.config.ts       ← Navigation routes config
│
├── lib/
│   └── .gitkeep
│
├── providers/
│   └── .gitkeep
│
├── assets/
│   ├── models/                    ← GLB 3D models
│   │   └── .gitkeep
│   ├── textures/                  ← WebP/KTX2 textures
│   │   └── .gitkeep
│   ├── images/                    ← Static images
│   │   └── .gitkeep
│   ├── audio/                     ← Sound files (Phase 2+)
│   │   └── .gitkeep
│   ├── fonts/                     ← Custom fonts
│   │   └── .gitkeep
│   ├── icons/                     ← SVG icons
│   │   └── .gitkeep
│   └── shaders/                   ← Shader source files (GLSL)
│       └── .gitkeep
│
└── styles/
    ├── globals.css                ← Global styles (may already exist)
    ├── variables.css              ← CSS custom properties
    ├── typography.css             ← Font and text system
    └── animations.css             ← Global animation classes
```

---

### 2. Placeholder Store Files

Create minimal-but-correct Zustand store skeletons. **Do not implement any logic yet.** Just define the shape with proper TypeScript types.

#### `src/store/world.store.ts`

```typescript
// world.store.ts
// Owns: global 3D world state — active scene, loading status
// Zustand store — state, actions, selectors

import { create } from 'zustand';
import type { WorldState } from '@/types/world.types';

type WorldStore = {
  isWorldLoaded: boolean;
  setWorldLoaded: (loaded: boolean) => void;
};

export const useWorldStore = create<WorldStore>((set) => ({
  isWorldLoaded: false,
  setWorldLoaded: (loaded) => set({ isWorldLoaded: loaded }),
}));
```

#### `src/store/navigation.store.ts`

```typescript
// navigation.store.ts
// Owns: current island selection, destination, travel state

import { create } from 'zustand';

type NavigationStore = {
  currentIslandId: string | null;
  setCurrentIsland: (id: string | null) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentIslandId: null,
  setCurrentIsland: (id) => set({ currentIslandId: id }),
}));
```

#### `src/store/camera.store.ts`

```typescript
// camera.store.ts
// Owns: camera mode (Cinematic | Exploration | Focus | Return)

import { create } from 'zustand';
import type { CameraMode } from '@/types/camera.types';

type CameraStore = {
  mode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
};

export const useCameraStore = create<CameraStore>((set) => ({
  mode: 'cinematic',
  setCameraMode: (mode) => set({ mode }),
}));
```

---

### 3. Core TypeScript Type Files

#### `src/types/world.types.ts`

```typescript
// world.types.ts
// Shared types for world state and world objects

export type WorldLoadingStatus = 'idle' | 'loading' | 'ready' | 'error';

export type WorldState = {
  loadingStatus: WorldLoadingStatus;
  isWorldLoaded: boolean;
};
```

#### `src/types/island.types.ts`

```typescript
// island.types.ts
// Defines what an Island is in the world

export type IslandType =
  | 'home'
  | 'skills'
  | 'experience'
  | 'achievement'
  | 'harbor'
  | 'project';

export type IslandPosition = {
  x: number;
  y: number;
  z: number;
};

export type IslandDefinition = {
  id: string;
  type: IslandType;
  label: string;
  position: IslandPosition;
  isUnlocked: boolean;
};
```

#### `src/types/navigation.types.ts`

```typescript
// navigation.types.ts
// Defines navigation routes between world locations

export type NavigationRoute = {
  fromId: string;
  toId: string;
  distance: number;
  isActive: boolean;
};
```

#### `src/types/camera.types.ts`

```typescript
// camera.types.ts

export type CameraMode = 'cinematic' | 'exploration' | 'focus' | 'return';

export type CameraPosition = {
  x: number;
  y: number;
  z: number;
};

export type CameraTarget = {
  x: number;
  y: number;
  z: number;
};

export type CameraState = {
  mode: CameraMode;
  position: CameraPosition;
  target: CameraTarget;
};
```

---

### 4. Constants Files

#### `src/constants/world.constants.ts`

```typescript
// world.constants.ts
// Static values that define world dimensions and rules

export const WORLD_FOG_COLOR = '#0a0a1a' as const;
export const WORLD_FOG_NEAR = 50 as const;
export const WORLD_FOG_FAR = 300 as const;
export const WORLD_BACKGROUND_COLOR = '#050510' as const;
export const WORLD_GRAVITY = 0 as const;
```

#### `src/constants/camera.constants.ts`

```typescript
// camera.constants.ts

export const CAMERA_DEFAULT_FOV = 60 as const;
export const CAMERA_DEFAULT_DISTANCE = 17 as const;
export const CAMERA_NEAR_PLANE = 0.1 as const;
export const CAMERA_FAR_PLANE = 1000 as const;
export const CAMERA_CINEMATIC_POSITION = { x: 0, y: 10, z: 20 } as const;
export const CAMERA_EXPLORATION_POSITION = { x: 0, y: 30, z: 40 } as const;
```

#### `src/constants/animation.constants.ts`

```typescript
// animation.constants.ts
// All animation durations and easing values

export const ANIMATION_DURATION_FAST = 200 as const;    // ms
export const ANIMATION_DURATION_NORMAL = 400 as const;  // ms
export const ANIMATION_DURATION_SLOW = 800 as const;    // ms
export const ANIMATION_DURATION_CINEMATIC = 2000 as const; // ms

export const ANIMATION_EASING_DEFAULT = 'power2.inOut' as const;
export const ANIMATION_EASING_CINEMATIC = 'power4.inOut' as const;
```

#### `src/constants/island.constants.ts`

```typescript
// island.constants.ts
// Island world positions and definitions — no hardcoded values in components

import type { IslandDefinition } from '@/types/island.types';

export const ISLAND_DEFINITIONS: IslandDefinition[] = [
  {
    id: 'home-island',
    type: 'home',
    label: 'Home Island',
    position: { x: -30, y: 0, z: 0 },
    isUnlocked: true,
  },
  {
    id: 'skills-island',
    type: 'skills',
    label: 'Skills Island',
    position: { x: 0, y: 0, z: -40 },
    isUnlocked: true,
  },
  {
    id: 'experience-island',
    type: 'experience',
    label: 'Experience Island',
    position: { x: 35, y: 0, z: -15 },
    isUnlocked: true,
  },
  {
    id: 'achievement-island',
    type: 'achievement',
    label: 'Achievement Island',
    position: { x: 30, y: 0, z: 20 },
    isUnlocked: true,
  },
  {
    id: 'harbor-island',
    type: 'harbor',
    label: 'Harbor Island',
    position: { x: 0, y: 0, z: 40 },
    isUnlocked: true,
  },
];
```

---

### 5. Config Files

#### `src/config/app.config.ts`

```typescript
// app.config.ts
// Centralizes all environment variable access — components NEVER access process.env directly

export const AppConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  worldName: process.env.NEXT_PUBLIC_WORLD_NAME ?? "The Developer's Voyage",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID ?? '',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;
```

#### `src/config/world.config.ts`

```typescript
// world.config.ts
// Runtime world configuration — controls world behavior

export const WorldConfig = {
  enableShadows: true,
  enableFog: true,
  enablePostProcessing: false, // Enable in Phase 2+
  maxIslandCount: 10,
  oceanSegments: 128,
  targetFps: 60,
} as const;
```

---

### 6. Root App Files

#### `src/app/layout.tsx` — Verify/Update Root Layout

Ensure the root layout:
- Uses the correct fonts from the design system
- Has proper metadata for SEO
- Wraps with providers (empty for now)
- Has `<html lang="en">`

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import '@/styles/globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Developer's Voyage",
  description: 'An immersive 3D portfolio experience — navigate a pirate world to discover projects, skills, and experience.',
  keywords: ['portfolio', '3D', 'developer', 'Three.js', 'interactive'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

#### `src/app/(portfolio)/page.tsx` — Route Placeholder

```typescript
// This is a placeholder until the Three.js world is mounted in TARGET-003
export default function PortfolioPage() {
  return (
    <main>
      <p>World is being built...</p>
    </main>
  );
}
```

---

## Naming Rules (Enforced)

| What               | Convention       | Example                       |
|--------------------|------------------|-------------------------------|
| Folders            | `kebab-case`     | `navigation-system/`          |
| File names         | `kebab-case`     | `world.store.ts`              |
| React components   | `PascalCase`     | `export function WorldCanvas` |
| TypeScript types   | `PascalCase`     | `IslandDefinition`            |
| Constants          | `UPPER_SNAKE_CASE` | `CAMERA_DEFAULT_DISTANCE`   |
| Store hooks        | `use*Store`      | `useWorldStore`               |
| Custom hooks       | `use*`           | `useNavigation`               |

---

## Engineering Rules to Enforce

- ❌ No `any` — all types must be explicit
- ❌ No hardcoded values in components — use constants
- ❌ No business logic in `src/app/` — routing only
- ❌ No API calls in components
- ❌ No default exports from stores/types/constants — use named exports
- ✅ All stores must use `Zustand` with typed state and actions
- ✅ All constants are `as const` or typed enum

---

## Acceptance Criteria

- [ ] All folders listed above exist in `src/`
- [ ] Every folder has at minimum `.gitkeep` or a valid placeholder file
- [ ] All 4 store files exist with correct TypeScript structure
- [ ] All 4 type files exist with correct interface/type definitions
- [ ] All 4 constants files exist with correct values
- [ ] All 3 config files exist and no env var is accessed outside `config/`
- [ ] Root `layout.tsx` has correct fonts, metadata, and `lang="en"`
- [ ] Placeholder portfolio page exists and renders without errors
- [ ] `pnpm dev` runs without TypeScript errors
- [ ] No `any` types exist in any of the above files

---

## Definition of Done

- [ ] All folders committed
- [ ] No TypeScript errors (`pnpm tsc --noEmit` passes)
- [ ] No ESLint errors (`pnpm lint` passes)
- [ ] Branch created: `feature/folder-architecture-setup`
- [ ] PR description explains every folder's purpose
