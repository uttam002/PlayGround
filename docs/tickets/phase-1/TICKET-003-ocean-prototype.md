# TICKET-003 — Ocean Prototype

## Ticket Metadata

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **ID**       | TICKET-003                                         |
| **Phase**    | Phase 1 — World Foundation                         |
| **Priority** | 🔴 Critical                                        |
| **Type**     | 3D / Visual                                        |
| **Estimated Effort** | 2–3 days                                 |
| **Depends On** | TICKET-001, TICKET-002                         |
| **Blocks**   | TICKET-004 (Ship needs ocean to sit on)            |
| **Branch**   | `feature/ocean-prototype`                          |

---

## Objective

Build the animated ocean prototype — the visual world foundation. The ocean must look atmospheric (dark, moonlit water), animate with gentle waves, and perform efficiently.

**Version 1 scope (this ticket):**
- ✅ Ocean surface with wave animation
- ✅ Moonlight reflection on water
- ✅ Animated via `useFrame` (not shaders)
- ❌ No GLSL shaders yet (Phase 2)
- ❌ No realistic water reflections yet (Phase 2)
- ❌ No foam or splashing effects yet (Phase 2)

**Success criteria:** Ocean moves. Ocean looks atmospheric. Ocean is performant.

---

## Background

The ocean is the most expensive persistent object in the scene. It must be optimized from the start:
- Reuse geometry — one PlaneGeometry, not rebuilt each frame
- Reuse material — shared ocean material
- `useFrame` only updates wave vertices — no other logic allowed inside
- Maximum subdivision: `128 x 128` segments (controlled by `WorldConfig.oceanSegments`)

---

## Scope

**Primary paths:**
```
src/three/objects/ocean/
src/three/materials/
src/three/world/world.tsx
src/constants/world.constants.ts
```

---

## Deliverables

### 1. Ocean Material — `src/three/materials/ocean.material.ts`

**Purpose:** Defines the reusable ocean material. Materials must never be recreated per frame or per component.

**Material Spec (Moonlit Ocean):**

| Property           | Value              | Reason                              |
|--------------------|--------------------|-------------------------------------|
| `color`            | `#0a1628`          | Deep dark ocean base                |
| `emissive`         | `#0d2040`          | Subtle inner glow                   |
| `emissiveIntensity`| `0.2`              | Low — creates night-time depth      |
| `metalness`        | `0.9`              | High — moon reflection              |
| `roughness`        | `0.1`              | Low — smooth water reflection       |
| `transparent`      | `true`             | Allow depth visual                  |
| `opacity`          | `0.92`             | Slight translucency                 |
| `side`             | `THREE.FrontSide`  | Render top face only                |

```typescript
// src/three/materials/ocean.material.ts
// Owns: shared ocean material — must be instantiated ONCE, reused everywhere

import * as THREE from 'three';

const OCEAN_BASE_COLOR = '#0a1628' as const;
const OCEAN_EMISSIVE_COLOR = '#0d2040' as const;
const OCEAN_EMISSIVE_INTENSITY = 0.2 as const;
const OCEAN_METALNESS = 0.9 as const;
const OCEAN_ROUGHNESS = 0.1 as const;
const OCEAN_OPACITY = 0.92 as const;

// Singleton material — create once, share everywhere
let oceanMaterialInstance: THREE.MeshStandardMaterial | null = null;

export function getOceanMaterial(): THREE.MeshStandardMaterial {
  if (!oceanMaterialInstance) {
    oceanMaterialInstance = new THREE.MeshStandardMaterial({
      color: new THREE.Color(OCEAN_BASE_COLOR),
      emissive: new THREE.Color(OCEAN_EMISSIVE_COLOR),
      emissiveIntensity: OCEAN_EMISSIVE_INTENSITY,
      metalness: OCEAN_METALNESS,
      roughness: OCEAN_ROUGHNESS,
      transparent: true,
      opacity: OCEAN_OPACITY,
      side: THREE.FrontSide,
    });
  }
  return oceanMaterialInstance;
}

export function disposeOceanMaterial(): void {
  oceanMaterialInstance?.dispose();
  oceanMaterialInstance = null;
}
```

---

### 2. Ocean Constants — Update `src/constants/world.constants.ts`

Add ocean-specific constants to the existing constants file:

```typescript
// Add to src/constants/world.constants.ts

export const OCEAN_SIZE = 500 as const;           // world units
export const OCEAN_SEGMENTS = 128 as const;       // grid subdivisions
export const OCEAN_POSITION_Y = -1 as const;      // slightly below origin
export const OCEAN_WAVE_SPEED = 0.5 as const;     // wave animation speed multiplier
export const OCEAN_WAVE_HEIGHT = 0.3 as const;    // max wave height in world units
export const OCEAN_WAVE_FREQUENCY = 0.08 as const; // wave frequency (tighter = more waves)
```

---

### 3. Ocean Wave Utilities — `src/three/utils/ocean.utils.ts`

**Purpose:** Pure math functions for wave calculation. Must be completely independent of React, Three.js rendering, or state. Easily testable.

```typescript
// src/three/utils/ocean.utils.ts
// Pure wave calculation utilities — no Three.js dependencies, fully testable

/**
 * Calculates wave height at a given world position and time
 * Uses combined sine waves to create organic, non-repeating wave patterns
 */
export function calculateWaveHeight(
  x: number,
  z: number,
  time: number,
  speed: number,
  height: number,
  frequency: number
): number {
  const primaryWave = Math.sin(x * frequency + time * speed) * height;
  const secondaryWave = Math.sin(z * frequency * 0.8 + time * speed * 1.2) * height * 0.5;
  const tertiaryWave = Math.sin((x + z) * frequency * 0.5 + time * speed * 0.7) * height * 0.3;
  return primaryWave + secondaryWave + tertiaryWave;
}
```

---

### 4. Ocean Object — `src/three/objects/ocean/ocean.tsx`

**Purpose:** The animated ocean plane. Uses `useFrame` to animate vertex positions each frame.

**Rules:**
- One component, one responsibility: render and animate the ocean
- Geometry must be created once (stored in ref) — never recreated
- Material must come from `getOceanMaterial()` singleton
- Wave calculation delegated to `calculateWaveHeight()` utility
- `useFrame` ONLY updates vertex positions — nothing else
- Must cleanup geometry and material on unmount

```typescript
// src/three/objects/ocean/ocean.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getOceanMaterial, disposeOceanMaterial } from '@/three/materials/ocean.material';
import { calculateWaveHeight } from '@/three/utils/ocean.utils';
import {
  OCEAN_SIZE,
  OCEAN_SEGMENTS,
  OCEAN_POSITION_Y,
  OCEAN_WAVE_SPEED,
  OCEAN_WAVE_HEIGHT,
  OCEAN_WAVE_FREQUENCY,
} from '@/constants/world.constants';

export function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create geometry ONCE — never recreate in render
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE, OCEAN_SEGMENTS, OCEAN_SEGMENTS);
    geo.rotateX(-Math.PI / 2); // Rotate flat — planes are vertical by default
    return geo;
  }, []);

  // Animate wave vertices each frame
  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const waveY = calculateWaveHeight(
        x,
        z,
        time,
        OCEAN_WAVE_SPEED,
        OCEAN_WAVE_HEIGHT,
        OCEAN_WAVE_FREQUENCY
      );
      positions.setY(i, waveY);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals(); // Recalculate normals for correct lighting
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={getOceanMaterial()}
      position={[0, OCEAN_POSITION_Y, 0]}
      receiveShadow
    />
  );
}
```

---

### 5. Ocean Folder Barrel — `src/three/objects/ocean/index.ts`

```typescript
export { Ocean } from './ocean';
```

---

### 6. Update World Composition — `src/three/world/world.tsx`

Add `<Ocean />` to the world:

```typescript
// src/three/world/world.tsx
import { WorldEnvironment } from '@/three/environment/world-environment';
import { Ocean } from '@/three/objects/ocean';

export function World() {
  return (
    <>
      <WorldEnvironment />
      <Ocean />
      {/* Future: <WorldShip /> */}
      {/* Future: <WorldIslands /> */}
      {/* Future: <NavigationRoutes /> */}
    </>
  );
}
```

---

### 7. Ocean Types — `src/three/objects/ocean/ocean.types.ts`

```typescript
// src/three/objects/ocean/ocean.types.ts

export type OceanWaveConfig = {
  speed: number;
  height: number;
  frequency: number;
};

export type OceanConfig = {
  size: number;
  segments: number;
  positionY: number;
  wave: OceanWaveConfig;
};
```

---

## Performance Requirements

| Metric           | Target     | Notes                              |
|------------------|------------|------------------------------------|
| FPS (Desktop)    | 60 FPS     | Must maintain with ocean active    |
| FPS (Mobile)     | 30+ FPS    | Test on mid-range device simulation|
| Draw calls added | +1         | Ocean = 1 draw call                |
| `useFrame` time  | < 2ms      | Measure in React DevTools Profiler |

### Performance Notes

- If 128 segments cause FPS drops on mobile, reduce `OCEAN_SEGMENTS` to `64` in `world.constants.ts` — never change inline
- If `computeVertexNormals()` is expensive, benchmark. For version 1 it is acceptable.
- Do not use `positions.needsUpdate = true` on geometry that is not animated — only on the ocean

---

## Files to Create / Modify

| Action   | File                                              |
|----------|---------------------------------------------------|
| CREATE   | `src/three/objects/ocean/ocean.tsx`               |
| CREATE   | `src/three/objects/ocean/ocean.types.ts`          |
| CREATE   | `src/three/objects/ocean/index.ts`                |
| CREATE   | `src/three/materials/ocean.material.ts`           |
| CREATE   | `src/three/utils/ocean.utils.ts`                  |
| MODIFY   | `src/constants/world.constants.ts` (add ocean constants) |
| MODIFY   | `src/three/world/world.tsx` (add `<Ocean />`)     |

---

## Engineering Rules to Enforce

- ❌ No geometry recreation inside `useFrame` — geometry is immutable after creation
- ❌ No material recreation inside component renders
- ❌ No business logic inside `useFrame`
- ❌ No magic numbers — all values from `world.constants.ts`
- ✅ `geometry.computeVertexNormals()` called after vertex updates
- ✅ `positions.needsUpdate = true` set after vertex updates
- ✅ Ocean material is a singleton (`getOceanMaterial()` pattern)
- ✅ Wave calculation is a pure function (testable)
- ✅ Cleanup on unmount (`disposeOceanMaterial()` if needed)

---

## Unit Test — `src/three/utils/ocean.utils.test.ts`

Write basic unit tests for wave calculation:

```typescript
// src/three/utils/ocean.utils.test.ts
import { describe, it, expect } from 'vitest';
import { calculateWaveHeight } from './ocean.utils';

describe('calculateWaveHeight', () => {
  it('returns a number', () => {
    const height = calculateWaveHeight(0, 0, 0, 0.5, 0.3, 0.08);
    expect(typeof height).toBe('number');
  });

  it('returns 0 at time=0 and position=0', () => {
    // At x=0, z=0, time=0, all sine terms are 0
    const height = calculateWaveHeight(0, 0, 0, 0.5, 0.3, 0.08);
    expect(height).toBeCloseTo(0, 5);
  });

  it('does not exceed max wave height multiplied by total wave amplitude', () => {
    const maxHeight = 0.3;
    const height = calculateWaveHeight(100, 100, 100, 0.5, maxHeight, 0.08);
    // Combined waves max out at ~1.8x height
    expect(Math.abs(height)).toBeLessThan(maxHeight * 2);
  });
});
```

---

## Acceptance Criteria

- [ ] Ocean is visible as a large dark animated surface filling the scene
- [ ] Wave movement is smooth and continuous — gentle rolling ocean, not static
- [ ] Moonlight reflection is visible as light gleams on water surface
- [ ] FPS remains 60 on desktop (verified with Stats overlay)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Unit test for `calculateWaveHeight` passes with `pnpm test`
- [ ] Ocean draws exactly 1 draw call (visible in Stats)
- [ ] Geometry is not recreated on re-renders (verified via React DevTools)

---

## Definition of Done

- [ ] All files created and committed
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes (ocean.utils tests)
- [ ] Ocean visible and animated in running dev server
- [ ] PR description includes screenshot and FPS measurement
