# Project Execution Flow — Complete File-by-File Walkthrough

## How to Start the Project

```bash
# From the monorepo root
cd f:\A (vs code)\PlayGround

# Start ONLY the frontend (Phase 1)
pnpm --filter pirate-ocean-portfolio-frontend dev

# Or from within the frontend directly
cd pirate-ocean-portfolio-frontend
pnpm dev
```

This runs `next dev` which starts a local server at `http://localhost:3000`.

---

## What Happens When You Run `pnpm dev` — Step by Step

### Step 1 — Node.js / pnpm starts the Next.js dev server

```
pnpm dev
  └── runs: next dev
        └── Next.js starts on port 3000
        └── Reads: next.config.ts
        └── Sets up: hot module replacement (HMR)
        └── Watches: all files in src/ for changes
```

**File read:** [`next.config.ts`](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/next.config.ts)  
Right now it only enables `reactCompiler: true`. This activates React 19's compiler which auto-optimizes re-renders.

---

### Step 2 — Browser opens `http://localhost:3000`

The browser makes a GET request. Next.js App Router matches the URL to a route.

---

### Step 3 — App Router resolves the route

```
URL: /
App Router looks in: src/app/
Finds: src/app/page.tsx  ← This is the root route handler
```

**File read:** [`src/app/page.tsx`](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/app/page.tsx)

This is a **Server Component** (no `"use client"` directive). Next.js renders it on the server. Currently returns the "Setting sail..." placeholder.

---

### Step 4 — Root Layout wraps the page

Before `page.tsx` content is sent to the browser, Next.js wraps it in the root layout.

**File read:** [`src/app/layout.tsx`](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/app/layout.tsx)

This file does:
1. Loads **Cinzel** and **Inter** from Google Fonts via `next/font/google`
   - `next/font` downloads the fonts at build time → zero layout shift → no external network request in browser
   - Injects CSS variables: `--font-cinzel` and `--font-inter` on the `<html>` element
2. Exports `metadata` object → Next.js injects `<title>`, `<meta description>`, OpenGraph tags into `<head>` automatically
3. Returns the full HTML shell: `<html lang="en">` → `<body>` → `{children}`

**What the browser receives (simplified HTML):**
```html
<html lang="en" class="__variable_cinzel __variable_inter">
  <head>
    <title>The Developer's Voyage</title>
    <meta name="description" content="An immersive 3D portfolio experience...">
    <style> /* Cinzel + Inter font faces injected here */ </style>
  </head>
  <body>
    <main style="background: #050510; ...">
      Setting sail...
    </main>
  </body>
</html>
```

---

### Step 5 — Global CSS is applied

**File read:** [`src/app/globals.css`](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/app/globals.css)

This is imported in `layout.tsx` (`import './globals.css'`). It contains:
- Tailwind CSS directives (`@import "tailwindcss"`)
- shadcn/ui base styles
- Global CSS reset and base styles

The browser processes this CSS and applies it to the document.

---

### Step 6 — User sees the page

**Right now (Phase 1 TARGET-001 complete):**  
A dark navy-black screen with "Setting sail..." centered in Cinzel font.

**After TARGET-002 (next step):**  
The Three.js canvas mounts here — user sees the cinematic 3D world.

---

## Complete File Architecture — What Each File Does

```
pirate-ocean-portfolio-frontend/
├── next.config.ts              ← Next.js config. Enables React Compiler.
├── tsconfig.json               ← TypeScript config. Sets @/ alias for src/
├── package.json                ← Dependencies. Scripts: dev, build, start, lint
│
└── src/
    ├── app/                    ← Next.js App Router ONLY. No business logic here.
    │   ├── layout.tsx          ← Root HTML shell. Fonts. Metadata. Providers.
    │   ├── page.tsx            ← Route: "/" — mounts the world scene
    │   ├── globals.css         ← Global CSS. Tailwind. Base reset.
    │   ├── loading.tsx         ← (future) Shown while page loads
    │   ├── error.tsx           ← (future) Shown on uncaught errors
    │   └── not-found.tsx       ← (future) 404 page
    │
    ├── constants/              ← Static values. Never change at runtime. No functions.
    │   ├── world.constants.ts  ← WORLD.FOG_COLOR, WORLD.OCEAN_SIZE, etc.
    │   ├── camera.constants.ts ← CAMERA.FOV, CAMERA.CINEMATIC.POSITION, etc.
    │   ├── animation.constants.ts ← ANIMATION.DURATION.FAST, ANIMATION.EASE.CINEMATIC
    │   ├── island.constants.ts ← ISLAND_DEFINITIONS[], ISLAND_GEOMETRY{}, ISLAND_INTERACTION{}
    │   ├── navigation.constants.ts ← NAVIGATION_ROUTE{}, SHIP_HUB{}
    │   └── ship.constants.ts   ← SHIP.POSITION, SHIP.FLOAT{}, SHIP.ROCK{}, SHIP.PLACEHOLDER{}
    │
    ├── types/                  ← TypeScript type definitions. No runtime code.
    │   ├── world.types.ts      ← WorldLoadingStatus, WorldState
    │   ├── island.types.ts     ← IslandType, IslandPosition, IslandDefinition
    │   ├── navigation.types.ts ← NavigationRoute, NavigationState, IslandSelectEvent
    │   └── camera.types.ts     ← CameraMode, CameraVector3, CameraState
    │
    ├── config/                 ← Runtime config. Controls app behavior. Reads env vars.
    │   ├── app.config.ts       ← AppConfig: appUrl, worldName, isDevelopment, isProduction
    │   ├── world.config.ts     ← WorldConfig: enableFog, enableShadows, targetFps
    │   └── navigation.config.ts ← NavigationConfig: enableTravelAnimation, hoverDebounceMs
    │
    ├── store/                  ← Zustand global state. State + Actions + Selectors.
    │   ├── world.store.ts      ← useWorldStore: isWorldLoaded, setWorldLoaded
    │   ├── navigation.store.ts ← useNavigationStore: selectedIslandId, hoverIsland, routes
    │   └── camera.store.ts     ← useCameraStore: mode, isTransitioning, focusTargetId
    │
    ├── hooks/                  ← Reusable React hooks. Behavior, not UI.
    │   ├── use-camera.ts       ← (TARGET-004) useCamera(): enterExploration, enterCinematic
    │   └── use-navigation.ts   ← (TARGET-006) useNavigation(): navigateToIsland, hoverIsland
    │
    ├── services/               ← External communication only. HTTP, email, analytics.
    │   └── (empty — Phase 2+)
    │
    ├── providers/              ← React context providers. Initialize systems.
    │   └── (empty — Phase 2+, QueryProvider, etc.)
    │
    ├── lib/                    ← Feature-agnostic utilities. Pure functions.
    │   └── (empty — added as needed)
    │
    ├── components/             ← Reusable UI components. No business logic.
    │   ├── ui/                 ← shadcn/ui primitives (Button, Dialog, Badge…)
    │   ├── common/             ← App-wide reusable: WorldLogo, OverlayControls
    │   └── layout/             ← Structure: WorldOverlay, IslandLayout
    │
    ├── features/               ← Feature ownership. Each folder = one feature.
    │   ├── world/              ← WorldScene.tsx — mounts canvas, sets isWorldLoaded
    │   ├── camera/             ← CameraDebugPanel.tsx (dev only)
    │   ├── navigation/         ← Navigation feature orchestration
    │   ├── islands/            ← Island feature orchestration
    │   ├── ship/               ← Ship feature orchestration
    │   └── ui-overlay/         ← UiOverlay.tsx, IslandInfoPanel.tsx
    │
    ├── three/                  ← Three.js world engine. Owns visuals ONLY.
    │   ├── core/
    │   │   └── world-canvas.tsx   ← <Canvas> setup. SSR-safe. Dev Stats.
    │   ├── world/
    │   │   ├── world.tsx          ← Composition: Ocean + Ship + Islands + Routes + Camera
    │   │   └── world-islands.tsx  ← Renders all ISLAND_DEFINITIONS as Island components
    │   ├── environment/
    │   │   └── world-environment.tsx ← Lights + Fog + Sky color
    │   ├── cameras/
    │   │   └── world-camera.tsx   ← Reads camera store, runs GSAP transitions
    │   ├── objects/
    │   │   ├── ocean/
    │   │   │   └── ocean.tsx      ← Animated ocean plane via useFrame
    │   │   ├── ship/
    │   │   │   └── ship.tsx       ← Ship with idle float/rock animation
    │   │   ├── island/
    │   │   │   ├── island.tsx     ← Generic island (data-driven, NOT per-type)
    │   │   │   └── island-base.tsx ← Sandy terrain geometry
    │   │   ├── environment-props/
    │   │   │   └── palm-tree.tsx  ← Reusable palm tree object
    │   │   └── navigation-routes/
    │   │       ├── navigation-routes.tsx    ← Renders all routes from store
    │   │       └── navigation-route-line.tsx ← Single route line, reacts to hover/active
    │   ├── materials/
    │   │   └── ocean.material.ts  ← Singleton material factory (created once, shared)
    │   ├── loaders/
    │   │   └── ship.loader.ts     ← GLB loading — components never call useGLTF directly
    │   ├── utils/
    │   │   └── ocean.utils.ts     ← calculateWaveHeight() — pure, testable math
    │   ├── effects/               ← Post-processing (Bloom, DOF) — Phase 2+
    │   ├── controls/              ← Orbit/nav controls — Phase 2+
    │   └── shaders/               ← GLSL shaders — Phase 2+
    │
    ├── styles/                 ← Global styling system
    │   ├── globals.css         ← (moved from app/) Tailwind + reset
    │   ├── variables.css       ← ALL CSS custom properties (--ocean-primary, --font-display…)
    │   ├── typography.css      ← .font-display, .text-heading-1, .text-label…
    │   └── animations.css      ← Global animation keyframes
    │
    └── assets/                 ← Static files only. No code.
        ├── models/             ← GLB 3D models (main-ship.glb, etc.)
        ├── textures/           ← WebP/KTX2 textures
        ├── images/             ← Static images
        ├── audio/              ← Sound files (Phase 2+)
        ├── fonts/              ← Custom font files
        ├── icons/              ← SVG icons
        └── shaders/            ← GLSL source files
```

---

## Full Data Flow — From User Action to Screen Update

### Example: User clicks an island

```
1. USER clicks island in browser
       ↓
2. Three.js pointer event fires on Island group [island.tsx]
       ↓
3. island.tsx calls:  hoverIsland(id) or selectIsland(id)
   RULE: Three.js ONLY emits to store. Never controls UI directly.
       ↓
4. navigation.store.ts updates state:
   - selectedIslandId = 'skills-island'
   - routes[2].isActive = true  (the route to skills island)
       ↓
5. ALL components subscribed to this store re-render:
   ┌─────────────────────────────────────────────────┐
   │  navigation-route-line.tsx  → highlights route  │  (Three.js layer)
   │  island.tsx                 → scale becomes 1.05 │  (Three.js layer)
   │  island-info-panel.tsx      → panel appears      │  (React UI layer)
   └─────────────────────────────────────────────────┘
```

### Example: Camera mode changes to Exploration

```
1. User calls enterExploration() from a UI button
       ↓
2. use-camera.ts hook:
   - checks isTransitioning (if true, abort)
   - calls setCameraMode('exploration')
       ↓
3. camera.store.ts updates:
   - mode = 'exploration'
   - isTransitioning = true
       ↓
4. world-camera.tsx (inside Canvas) reads mode change:
   - useEffect fires because [mode] dependency changed
   - kills any existing GSAP animation
   - starts GSAP tween: camera.position → CAMERA.EXPLORATION.POSITION
       ↓
5. Each GSAP frame:
   - camera.position.x/y/z interpolates smoothly
   - camera.lookAt(target) called on every update
       ↓
6. GSAP animation completes:
   - onComplete fires
   - setIsTransitioning(false) called
       ↓
7. camera.store.ts updates:
   - isTransitioning = false
       ↓
8. Any UI that was disabled during transition re-enables
```

---

## Dependency Rules — What Can Import What

```
ALLOWED (top → bottom only):

  app/          → features, components
  features/     → components, hooks, services, store, constants, config, types
  components/   → hooks, constants, types
  hooks/        → store, services, constants, config, types
  store/        → types, constants
  services/     → types, config
  constants/    → types (only for typed const arrays like ISLAND_DEFINITIONS)
  config/       → (reads process.env only)
  types/        → (nothing — pure type definitions)
  three/        → store, constants, types, utils  (reads state, never owns it)

FORBIDDEN:
  ✗ components/ importing from features/
  ✗ components/ calling APIs directly
  ✗ three/ owning application state
  ✗ three/ opening modals or navigating routes
  ✗ anything importing from app/
  ✗ process.env accessed anywhere except config/
```

---

## Constants Pattern — How to Read and Use

All constants are grouped objects. Always access them like this:

```typescript
// ✅ CORRECT — grouped access
import { CAMERA } from '@/constants/camera.constants';
import { WORLD } from '@/constants/world.constants';
import { ANIMATION } from '@/constants/animation.constants';
import { SHIP } from '@/constants/ship.constants';
import { ISLAND_GEOMETRY } from '@/constants/island.constants';
import { NAVIGATION_ROUTE } from '@/constants/navigation.constants';

// Usage:
camera.fov = CAMERA.FOV;                         // 60
camera.position.set(
  CAMERA.CINEMATIC.POSITION.x,                   // 8
  CAMERA.CINEMATIC.POSITION.y,                   // 12
  CAMERA.CINEMATIC.POSITION.z                    // 18
);
const duration = ANIMATION.DURATION.CINEMATIC;    // 2000
const fogColor = WORLD.FOG_COLOR;                 // '#0a0a1a'
const shipPos  = SHIP.POSITION;                   // { x: 0, y: 0, z: 0 }

// ❌ WRONG — never write raw values
camera.position.set(8, 12, 18);                  // What is 18? Mystery number.
const fogColor = '#0a0a1a';                       // Hardcoded — not configurable.
```

---

## Environment Variables Flow

```
.env.local               ← Developer local secrets (never committed)
.env.example             ← Template showing what vars are needed (committed)
       ↓
src/config/app.config.ts ← ONLY place that reads process.env
       ↓
Components/features/hooks ← Import AppConfig, never process.env directly
```

**Example `.env.local`:**
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WORLD_NAME=The Developer's Voyage
DATABASE_URL=postgresql://...
```

---

## Performance Budget — How to Monitor

While developing, `<Stats />` from `@react-three/drei` shows:
- FPS (frames per second) — target 60 desktop
- MS (milliseconds per frame) — target < 16ms
- MB (memory used)

This panel only shows in development (`AppConfig.isDevelopment = true`).

**Draw call budget:**
- Empty scene (TARGET-002): < 5 draw calls
- With ocean (TARGET-003): ~6 draw calls
- With ship + islands (TARGET-005): < 50 draw calls
- Full Phase 1 scene: < 80 draw calls

---

## Git Workflow

Each Target = one feature branch:

```bash
git checkout -b feature/folder-architecture-setup   # TARGET-001
# ... do work ...
git add .
git commit -m "feat(foundation): setup complete folder architecture and constants"
git push origin feature/folder-architecture-setup
# Create PR → merge to main
```

Commit format: `type(scope): description`
- `feat` — new feature
- `fix` — bug fix
- `chore` — tooling/config
- `refactor` — restructure, no new behavior
