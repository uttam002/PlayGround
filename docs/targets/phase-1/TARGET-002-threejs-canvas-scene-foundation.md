# TARGET-002 — Three.js Canvas & Scene Foundation

## Target Metadata

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **ID**       | TARGET-002                                         |
| **Phase**    | Phase 1 — World Foundation                         |
| **Priority** | 🔴 Critical                                        |
| **Type**     | 3D / Infrastructure                                |
| **Estimated Effort** | 2–3 days                                 |
| **Depends On** | TARGET-001 (folder structure must exist first) |
| **Blocks**   | TARGET-003, TARGET-004, TARGET-005                 |
| **Branch**   | `feature/threejs-canvas-scene-foundation`          |

---

## Objective

Build the working Three.js canvas, mount it into the Next.js app, set up the scene structure, configure global lighting, and establish the environment atmosphere.

At the end of this Target, visiting the app should show **a dark, atmospheric, cinematic scene** — no ocean, no ship yet — but with correct lighting, fog, and sky.

The scene must perform at **60 FPS desktop / 30+ FPS mobile**.

---

## Background

The world rendering system lives in `src/three/`. React Three Fiber is used as the React renderer for Three.js. The canvas must be mounted as a client component wrapped in a dynamic import so Next.js SSR does not attempt to render WebGL.

**Stack used in this Target:**
- `three` — 3D engine
- `@react-three/fiber` — React renderer
- `@react-three/drei` — helpers (Sky, Environment, Stats, etc.)
- `@react-three/postprocessing` — post-processing effects
- `gsap` — camera animation control
- `zustand` — camera and world state

---

## Scope

**Repository:** `pirate-ocean-portfolio-frontend`

**Primary paths:**
```
src/three/core/
src/three/environment/
src/three/world/
src/features/world/
src/app/(portfolio)/page.tsx
```

---

## Deliverables

### 1. World Canvas Component — `src/three/core/world-canvas.tsx`

**Purpose:** Mounts the React Three Fiber `<Canvas>`. The only entry point for the 3D world.

**Rules:**
- Must be a `"use client"` component (WebGL requires browser)
- `<Canvas>` must have `shadows`, `dpr`, and `camera` props set using constants — no magic numbers
- Canvas must fill 100% of parent viewport
- Must include performance monitoring in development (`Stats` from drei)

```typescript
// src/three/core/world-canvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { Suspense } from 'react';
import { World } from '@/three/world/world';
import {
  CAMERA_DEFAULT_FOV,
  CAMERA_DEFAULT_DISTANCE,
  CAMERA_NEAR_PLANE,
  CAMERA_FAR_PLANE,
  CAMERA_CINEMATIC_POSITION,
} from '@/constants/camera.constants';
import { AppConfig } from '@/config/app.config';

export function WorldCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: CAMERA_DEFAULT_FOV,
        near: CAMERA_NEAR_PLANE,
        far: CAMERA_FAR_PLANE,
        position: [
          CAMERA_CINEMATIC_POSITION.x,
          CAMERA_CINEMATIC_POSITION.y,
          CAMERA_CINEMATIC_POSITION.z,
        ],
      }}
      style={{ width: '100%', height: '100vh' }}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <World />
      </Suspense>
      {AppConfig.isDevelopment && <Stats />}
    </Canvas>
  );
}
```

---

### 2. World Composition Component — `src/three/world/world.tsx`

**Purpose:** Orchestrates everything inside the canvas. This is the parent component that composes all world sub-systems.

**Rule:** This file must remain composable. It must NEVER become a giant monolithic file. Each sub-system is a separate component.

```typescript
// src/three/world/world.tsx
// World is the composition root for all 3D systems.
// It assembles systems — it does NOT implement them.

import { WorldEnvironment } from '@/three/environment/world-environment';

export function World() {
  return (
    <>
      {/* Environment: Lighting, Fog, Atmosphere */}
      <WorldEnvironment />

      {/* Future: <WorldOcean /> */}
      {/* Future: <WorldShip /> */}
      {/* Future: <WorldIslands /> */}
      {/* Future: <NavigationRoutes /> */}
    </>
  );
}
```

---

### 3. World Environment — `src/three/environment/world-environment.tsx`

**Purpose:** Owns all environmental systems — lighting, fog, sky colour, atmosphere.

**Lighting Spec (Version 1 — Moonlit Night):**

| Light Type         | Purpose                          | Settings                                |
|--------------------|----------------------------------|-----------------------------------------|
| `AmbientLight`     | Base fill light                  | color: `#0d1b2a`, intensity: `0.3`      |
| `DirectionalLight` | Moonlight (key light)            | color: `#c8d8e8`, intensity: `0.8`, `castShadow: true` |
| `HemisphereLight`  | Sky/ground colour split          | skyColor: `#0a0f1e`, groundColor: `#050508`, intensity: `0.5` |

**Fog Spec:**
- Type: `FogExp2`
- Color: Use `WORLD_FOG_COLOR` constant
- Density: `0.007`

```typescript
// src/three/environment/world-environment.tsx
'use client'; // Direct Three.js usage

import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  WORLD_FOG_COLOR,
  WORLD_BACKGROUND_COLOR,
} from '@/constants/world.constants';

const MOONLIGHT_COLOR = '#c8d8e8' as const;
const MOONLIGHT_INTENSITY = 0.8 as const;
const AMBIENT_COLOR = '#0d1b2a' as const;
const AMBIENT_INTENSITY = 0.3 as const;
const SKY_COLOR = '#0a0f1e' as const;
const GROUND_COLOR = '#050508' as const;
const HEMISPHERE_INTENSITY = 0.5 as const;
const FOG_DENSITY = 0.007 as const;

const MOONLIGHT_POSITION: [number, number, number] = [50, 80, 30];

export function WorldEnvironment() {
  const { scene } = useThree();
  const moonlightRef = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    scene.background = new THREE.Color(WORLD_BACKGROUND_COLOR);
    scene.fog = new THREE.FogExp2(WORLD_FOG_COLOR, FOG_DENSITY);

    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <ambientLight color={AMBIENT_COLOR} intensity={AMBIENT_INTENSITY} />
      <hemisphereLight
        color={SKY_COLOR}
        groundColor={GROUND_COLOR}
        intensity={HEMISPHERE_INTENSITY}
      />
      <directionalLight
        ref={moonlightRef}
        color={MOONLIGHT_COLOR}
        intensity={MOONLIGHT_INTENSITY}
        position={MOONLIGHT_POSITION}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
    </>
  );
}
```

---

### 4. Feature Integration — `src/features/world/world-scene.tsx`

**Purpose:** The React feature component that renders the canvas within the application UI layer. Acts as the bridge between the app and the Three.js canvas.

**Rules:**
- Must be a `"use client"` component
- Must use `next/dynamic` with `ssr: false` for canvas — WebGL cannot SSR
- Must use `useWorldStore` to set `isWorldLoaded: true` once canvas mounts

```typescript
// src/features/world/world-scene.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useWorldStore } from '@/store/world.store';

// Dynamic import prevents Next.js from attempting SSR on WebGL canvas
const WorldCanvas = dynamic(
  () => import('@/three/core/world-canvas').then((mod) => mod.WorldCanvas),
  {
    ssr: false,
    loading: () => <WorldLoadingFallback />,
  }
);

function WorldLoadingFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#050510',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c8d8e8',
        fontFamily: 'var(--font-cinzel)',
      }}
    >
      Setting sail...
    </div>
  );
}

export function WorldScene() {
  const setWorldLoaded = useWorldStore((s) => s.setWorldLoaded);

  useEffect(() => {
    setWorldLoaded(true);
  }, [setWorldLoaded]);

  return <WorldCanvas />;
}
```

---

### 5. Mount Canvas on Portfolio Page

Update `src/app/(portfolio)/page.tsx` to render the world scene:

```typescript
// src/app/(portfolio)/page.tsx
import { WorldScene } from '@/features/world/world-scene';

export default function PortfolioPage() {
  return (
    <main style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <WorldScene />
    </main>
  );
}
```

---

### 6. `src/three/core/index.ts` — Barrel Export

```typescript
export { WorldCanvas } from './world-canvas';
```

---

### 7. World Store Update

Update `src/store/world.store.ts` to reflect the actual loading state management:

```typescript
import { create } from 'zustand';

type WorldStore = {
  isWorldLoaded: boolean;
  setWorldLoaded: (loaded: boolean) => void;
};

export const useWorldStore = create<WorldStore>((set) => ({
  isWorldLoaded: false,
  setWorldLoaded: (loaded) => set({ isWorldLoaded: loaded }),
}));

// Selectors
export const selectIsWorldLoaded = (state: WorldStore) => state.isWorldLoaded;
```

---

## Performance Requirements

| Metric            | Target         | Tool to Measure        |
|-------------------|----------------|------------------------|
| FPS (Desktop)     | 60 FPS         | drei `<Stats />`       |
| FPS (Mobile)      | 30+ FPS        | Chrome DevTools         |
| Canvas mount time | < 3 seconds    | Browser Performance tab |
| Draw calls        | < 20 (empty scene) | Three.js Inspector |

The scene will be empty at this stage, so achieving these metrics should be straightforward. Log numbers and document them.

---

## Files to Create / Modify

| Action   | File                                          |
|----------|-----------------------------------------------|
| CREATE   | `src/three/core/world-canvas.tsx`             |
| CREATE   | `src/three/core/index.ts`                     |
| CREATE   | `src/three/world/world.tsx`                   |
| CREATE   | `src/three/world/index.ts`                    |
| CREATE   | `src/three/environment/world-environment.tsx` |
| CREATE   | `src/three/environment/index.ts`              |
| CREATE   | `src/features/world/world-scene.tsx`          |
| CREATE   | `src/features/world/index.ts`                 |
| MODIFY   | `src/app/(portfolio)/page.tsx`                |
| MODIFY   | `src/store/world.store.ts`                    |

---

## Engineering Rules to Enforce

- ❌ No `any` types anywhere
- ❌ No magic number values — all values from constants files
- ❌ No business logic inside Three.js components
- ❌ Three.js canvas must NOT attempt SSR — dynamic import with `ssr: false` is mandatory
- ✅ All Three.js components must clean up on unmount (`return () => {}` in useEffect)
- ✅ `<Canvas>` settings must be driven by constants, never inline strings/numbers
- ✅ Stats must only show in development (`AppConfig.isDevelopment`)
- ✅ WorldCanvas must be imported dynamically with `ssr: false`

---

## Acceptance Criteria

- [ ] App renders without any console errors or TypeScript errors
- [ ] A dark atmospheric background (deep navy/near-black) is visible on first load
- [ ] Moonlight and ambient lighting creates visible illumination (no flat black)
- [ ] Fog creates sense of depth in the distance
- [ ] `<Stats />` overlay is visible in `development` mode showing FPS
- [ ] World store `isWorldLoaded` becomes `true` after canvas mounts
- [ ] No SSR errors — canvas is dynamically imported
- [ ] Page loads under 3 seconds on average hardware

---

## Definition of Done

- [ ] All files created and committed
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] Dev mode shows working scene (dark + lit)
- [ ] FPS measured and documented in PR description
- [ ] PR description includes screenshot of rendered scene
