# TICKET-004 — Camera System

## Ticket Metadata

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **ID**       | TICKET-004                                         |
| **Phase**    | Phase 1 — World Foundation                         |
| **Priority** | 🔴 Critical                                        |
| **Type**     | 3D / System                                        |
| **Estimated Effort** | 2–3 days                                 |
| **Depends On** | TICKET-001, TICKET-002                         |
| **Blocks**   | TICKET-005 (Ship prototype needs camera modes), TICKET-006 (Navigation needs camera transitions) |
| **Branch**   | `feature/camera-system`                            |

---

## Objective

Build the programmatic camera control system for the 3D world. This system defines how the camera behaves in all four modes: Cinematic, Exploration, Focus, and Return.

**Version 1 scope (this ticket):**
- ✅ Camera mode type definitions
- ✅ Camera store (mode + position state)
- ✅ `useCamera` hook (mode switching logic)
- ✅ Camera controller component inside Three.js scene
- ✅ GSAP-driven smooth camera transitions between modes
- ✅ Cinematic mode (landing view)
- ✅ Exploration mode (overhead world view)
- ❌ No orbit controls yet — camera is fully programmatic
- ❌ No island-specific Focus mode yet (Phase 2)
- ❌ No Return mode implementation yet (Phase 2)

**Success criteria:** Camera movement can be controlled programmatically. Switching from Cinematic to Exploration mode produces a smooth GSAP-animated transition.

---

## Background

The camera is one of the most critical systems in the world. It defines the navigation experience. Poor camera implementation = broken UX.

**Architecture rules:**
- Camera logic ONLY lives in `src/three/cameras/`
- Camera state lives in `src/store/camera.store.ts`
- Camera can be controlled from anywhere by dispatching actions to the camera store
- The `WorldCamera` component reads the store and drives the Three.js camera
- GSAP is used for all camera transitions — never `lerp` manually

---

## Scope

**Primary paths:**
```
src/three/cameras/
src/store/camera.store.ts
src/hooks/use-camera.ts
src/constants/camera.constants.ts
src/types/camera.types.ts
```

---

## Camera Mode Definitions

The four camera modes define navigation states:

| Mode           | Camera Position              | Camera Target | Trigger            |
|----------------|------------------------------|---------------|--------------------|
| `cinematic`    | Close, dramatic angle        | Ship/origin   | Landing scene      |
| `exploration`  | High above, looking down     | World center  | World map view     |
| `focus`        | Near specific island         | Island center | Island selected    |
| `return`       | Transition back to explore   | World center  | Back button pressed|

---

## Deliverables

### 1. Update Camera Constants — `src/constants/camera.constants.ts`

Add camera position configs for all modes:

```typescript
// src/constants/camera.constants.ts
// Full camera constants — all values live here, never hardcoded in components

export const CAMERA_DEFAULT_FOV = 60 as const;
export const CAMERA_NEAR_PLANE = 0.1 as const;
export const CAMERA_FAR_PLANE = 1000 as const;
export const CAMERA_DEFAULT_DISTANCE = 17 as const;
export const CAMERA_TRANSITION_DURATION = 1.5 as const; // seconds (GSAP)
export const CAMERA_TRANSITION_EASE = 'power3.inOut' as const;

// Cinematic Mode — dramatic landing angle
export const CAMERA_CINEMATIC_POSITION = { x: 8, y: 12, z: 18 } as const;
export const CAMERA_CINEMATIC_TARGET = { x: 0, y: 0, z: 0 } as const;

// Exploration Mode — overhead world survey
export const CAMERA_EXPLORATION_POSITION = { x: 0, y: 55, z: 35 } as const;
export const CAMERA_EXPLORATION_TARGET = { x: 0, y: 0, z: 0 } as const;

// Focus Mode — close island view (populated dynamically with island position)
export const CAMERA_FOCUS_HEIGHT_OFFSET = 15 as const;
export const CAMERA_FOCUS_DISTANCE_OFFSET = 20 as const;

// Return Mode — same as exploration
export const CAMERA_RETURN_POSITION = { x: 0, y: 55, z: 35 } as const;
export const CAMERA_RETURN_TARGET = { x: 0, y: 0, z: 0 } as const;
```

---

### 2. Update Camera Types — `src/types/camera.types.ts`

```typescript
// src/types/camera.types.ts

export type CameraMode = 'cinematic' | 'exploration' | 'focus' | 'return';

export type CameraVector3 = {
  x: number;
  y: number;
  z: number;
};

export type CameraModeConfig = {
  position: CameraVector3;
  target: CameraVector3;
};

export type CameraState = {
  mode: CameraMode;
  isTransitioning: boolean;
  focusTargetId: string | null; // Island ID when in focus mode
};
```

---

### 3. Update Camera Store — `src/store/camera.store.ts`

Full camera store with mode, transitioning state, and all actions:

```typescript
// src/store/camera.store.ts
// Owns: camera mode, transition status, focus target

import { create } from 'zustand';
import type { CameraMode, CameraState } from '@/types/camera.types';

type CameraStore = CameraState & {
  // Actions
  setCameraMode: (mode: CameraMode) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  setFocusTarget: (islandId: string | null) => void;
};

export const useCameraStore = create<CameraStore>((set) => ({
  // State
  mode: 'cinematic',
  isTransitioning: false,
  focusTargetId: null,

  // Actions
  setCameraMode: (mode) => set({ mode }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  setFocusTarget: (focusTargetId) => set({ focusTargetId }),
}));

// Selectors
export const selectCameraMode = (state: CameraStore) => state.mode;
export const selectIsTransitioning = (state: CameraStore) => state.isTransitioning;
export const selectFocusTargetId = (state: CameraStore) => state.focusTargetId;
```

---

### 4. Camera Hook — `src/hooks/use-camera.ts`

**Purpose:** Business logic for camera mode transitions. This hook is the public API for switching camera modes.

**Rules:**
- This hook orchestrates, the `WorldCamera` component executes
- Never call GSAP directly in UI components — use this hook
- Transitions must be sequential — only one transition at a time

```typescript
// src/hooks/use-camera.ts
// Owns: camera mode transition orchestration
// Components call this hook to switch camera — they don't manipulate camera directly

import { useCallback } from 'react';
import { useCameraStore } from '@/store/camera.store';
import type { CameraMode } from '@/types/camera.types';

export function useCamera() {
  const { mode, isTransitioning, setCameraMode, setIsTransitioning } =
    useCameraStore();

  const transitionTo = useCallback(
    (newMode: CameraMode) => {
      if (isTransitioning || newMode === mode) return;

      setIsTransitioning(true);
      setCameraMode(newMode);

      // WorldCamera component handles the GSAP animation
      // and sets isTransitioning = false when complete
    },
    [mode, isTransitioning, setCameraMode, setIsTransitioning]
  );

  const enterExploration = useCallback(() => {
    transitionTo('exploration');
  }, [transitionTo]);

  const enterCinematic = useCallback(() => {
    transitionTo('cinematic');
  }, [transitionTo]);

  const returnToWorld = useCallback(() => {
    transitionTo('return');
  }, [transitionTo]);

  return {
    mode,
    isTransitioning,
    transitionTo,
    enterExploration,
    enterCinematic,
    returnToWorld,
  };
}
```

---

### 5. World Camera Component — `src/three/cameras/world-camera.tsx`

**Purpose:** The Three.js-side camera controller. Reads the camera store and uses GSAP to animate the Three.js camera to target positions.

**Rules:**
- Must be inside the `<Canvas>` — it uses `useThree()` to access the Three.js camera
- GSAP targets the camera object directly for smooth transitions
- On mode change: starts GSAP animation, sets `isTransitioning: false` when complete
- Must NOT trigger re-renders on every frame — only reacts to mode changes

```typescript
// src/three/cameras/world-camera.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useCameraStore } from '@/store/camera.store';
import {
  CAMERA_CINEMATIC_POSITION,
  CAMERA_CINEMATIC_TARGET,
  CAMERA_EXPLORATION_POSITION,
  CAMERA_EXPLORATION_TARGET,
  CAMERA_TRANSITION_DURATION,
  CAMERA_TRANSITION_EASE,
} from '@/constants/camera.constants';
import type { CameraMode, CameraVector3 } from '@/types/camera.types';

const CAMERA_CONFIGS: Record<
  Extract<CameraMode, 'cinematic' | 'exploration' | 'return'>,
  { position: CameraVector3; target: CameraVector3 }
> = {
  cinematic: {
    position: CAMERA_CINEMATIC_POSITION,
    target: CAMERA_CINEMATIC_TARGET,
  },
  exploration: {
    position: CAMERA_EXPLORATION_POSITION,
    target: CAMERA_EXPLORATION_TARGET,
  },
  return: {
    position: CAMERA_EXPLORATION_POSITION,
    target: CAMERA_EXPLORATION_TARGET,
  },
};

export function WorldCamera() {
  const { camera } = useThree();
  const mode = useCameraStore((s) => s.mode);
  const setIsTransitioning = useCameraStore((s) => s.setIsTransitioning);
  const gsapTimeline = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const config = CAMERA_CONFIGS[mode as keyof typeof CAMERA_CONFIGS];
    if (!config) return;

    // Kill any in-progress transition
    gsapTimeline.current?.kill();

    setIsTransitioning(true);

    // Animate camera position
    gsapTimeline.current = gsap.to(camera.position, {
      x: config.position.x,
      y: config.position.y,
      z: config.position.z,
      duration: CAMERA_TRANSITION_DURATION,
      ease: CAMERA_TRANSITION_EASE,
      onUpdate: () => {
        camera.lookAt(
          config.target.x,
          config.target.y,
          config.target.z
        );
      },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });

    return () => {
      gsapTimeline.current?.kill();
    };
  }, [mode, camera, setIsTransitioning]);

  // This component renders nothing — it just controls the camera
  return null;
}
```

---

### 6. Barrel Exports

#### `src/three/cameras/index.ts`

```typescript
export { WorldCamera } from './world-camera';
```

#### `src/hooks/index.ts` (create or update)

```typescript
export { useCamera } from './use-camera';
```

---

### 7. Add WorldCamera to World Composition

Update `src/three/world/world.tsx`:

```typescript
// src/three/world/world.tsx
import { WorldEnvironment } from '@/three/environment/world-environment';
import { Ocean } from '@/three/objects/ocean';
import { WorldCamera } from '@/three/cameras/world-camera';

export function World() {
  return (
    <>
      {/* Camera System */}
      <WorldCamera />

      {/* Environment */}
      <WorldEnvironment />

      {/* World Objects */}
      <Ocean />
      {/* Future: <WorldShip /> */}
      {/* Future: <WorldIslands /> */}
      {/* Future: <NavigationRoutes /> */}
    </>
  );
}
```

---

### 8. Camera Debug Controls (Dev Only)

To be able to test camera mode switching during development, create a simple dev-only UI control:

**`src/features/camera/camera-debug-panel.tsx`** *(development only — remove or hide in production)*

```typescript
// src/features/camera/camera-debug-panel.tsx
// DEV ONLY: Not part of final product — used for camera mode testing
'use client';

import { useCamera } from '@/hooks/use-camera';
import { AppConfig } from '@/config/app.config';

export function CameraDebugPanel() {
  if (!AppConfig.isDevelopment) return null;

  const { mode, isTransitioning, enterCinematic, enterExploration } = useCamera();

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.8)',
        color: '#c8d8e8',
        padding: '12px 16px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div>Camera: <strong>{mode}</strong> {isTransitioning ? '(transitioning...)' : ''}</div>
      <button onClick={enterCinematic} disabled={isTransitioning}>→ Cinematic</button>
      <button onClick={enterExploration} disabled={isTransitioning}>→ Exploration</button>
    </div>
  );
}
```

Mount it in `src/app/(portfolio)/page.tsx` wrapped in a dev check.

---

## Files to Create / Modify

| Action   | File                                              |
|----------|---------------------------------------------------|
| CREATE   | `src/three/cameras/world-camera.tsx`              |
| CREATE   | `src/three/cameras/index.ts`                      |
| CREATE   | `src/hooks/use-camera.ts`                         |
| CREATE   | `src/features/camera/camera-debug-panel.tsx`      |
| CREATE   | `src/features/camera/index.ts`                    |
| MODIFY   | `src/store/camera.store.ts` (full implementation) |
| MODIFY   | `src/types/camera.types.ts` (add new types)       |
| MODIFY   | `src/constants/camera.constants.ts` (add mode positions) |
| MODIFY   | `src/three/world/world.tsx` (add `<WorldCamera />`) |

---

## Engineering Rules to Enforce

- ❌ No camera manipulation outside of `src/three/cameras/`
- ❌ No GSAP calls inside UI components — only the store + hook layer
- ❌ No magic numbers — all camera positions come from `camera.constants.ts`
- ❌ No simultaneous GSAP transitions — kill previous before starting new
- ✅ Camera state lives only in `useCameraStore`
- ✅ `WorldCamera` renders null — it is a controller, not a visual component
- ✅ `useCamera` hook is the only public API for mode switching
- ✅ Dev debug panel must be hidden in production (`AppConfig.isDevelopment`)

---

## Acceptance Criteria

- [ ] On page load, camera starts in `cinematic` mode at the defined position
- [ ] Clicking "→ Exploration" in dev panel triggers smooth GSAP transition to overhead view
- [ ] `isTransitioning` is `true` during animation and `false` after completion
- [ ] Clicking the same mode button twice does nothing (guard in place)
- [ ] Killing and restarting a transition works (no stuck states)
- [ ] Debug panel is invisible in production (`NODE_ENV !== 'development'`)
- [ ] No TypeScript errors
- [ ] No ESLint errors

---

## Definition of Done

- [ ] All files created and committed
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] Dev mode shows camera transition working visually
- [ ] Camera mode switching is verified in dev panel
- [ ] PR includes video/GIF of camera transition
