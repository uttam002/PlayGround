# TICKET-005 — Ship & Island Prototypes

## Ticket Metadata

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **ID**       | TICKET-005                                         |
| **Phase**    | Phase 1 — World Foundation                         |
| **Priority** | 🟠 High                                            |
| **Type**     | 3D / Visual                                        |
| **Estimated Effort** | 3–4 days                                 |
| **Depends On** | TICKET-001, TICKET-002, TICKET-003 (ocean must exist) |
| **Blocks**   | TICKET-006 (Navigation routes need ship + islands) |
| **Branch**   | `feature/ship-island-prototypes`                   |

---

## Objective

Create the first working versions of the **Ship** and **Island** 3D objects.

These are prototypes — they establish the data-driven, composable architecture. Content, interactions, and full 3D models come in later phases.

**Ship Prototype Scope:**
- ✅ Ship visible in world (placeholder box or imported GLB)
- ✅ Subtle idle floating animation (bob up/down on ocean)
- ✅ Positioned at ship hub origin `(0, 0, 0)`
- ❌ No player controls yet
- ❌ No clicking/interaction yet
- ❌ No detailed model yet (placeholder acceptable for v1)

**Island Prototype Scope:**
- ✅ Island system is data-driven (configured from `ISLAND_DEFINITIONS` — no hardcoded individual islands)
- ✅ At least 3 islands visible in world at their defined positions
- ✅ Each island renders island base + 2-3 palm trees
- ✅ Islands use instanced geometry for trees
- ❌ No clickable islands yet (TICKET-006)
- ❌ No unique structures per island type yet (Phase 2)
- ❌ No detailed terrain models yet

**Success criteria:** Ship visible at world center. At least 3 islands visible at world positions. One island rendered visible in the ocean world.

---

## Background

**Critical architecture rule:** There must be ONE `Island` component that renders any island type based on configuration. It is forbidden to create separate `HomeIsland.tsx`, `SkillsIsland.tsx` etc.

The world is data-driven:
```
ISLAND_DEFINITIONS (constants) 
  → Island component (generic)
  → Configured per definition
```

Asset loading must go through dedicated loaders (not direct `useGLTF()` inside components).

---

## Scope

**Primary paths:**
```
src/three/objects/ship/
src/three/objects/island/
src/three/objects/environment-props/
src/three/loaders/
src/three/world/world.tsx
src/constants/island.constants.ts
```

---

## Ship Deliverables

### 1. Ship Constants — `src/constants/ship.constants.ts`

```typescript
// src/constants/ship.constants.ts

export const SHIP_POSITION = { x: 0, y: 0, z: 0 } as const;
export const SHIP_SCALE = { x: 1, y: 1, z: 1 } as const;

// Idle floating animation
export const SHIP_FLOAT_SPEED = 0.8 as const;         // animation speed
export const SHIP_FLOAT_AMPLITUDE = 0.15 as const;    // up/down distance in world units
export const SHIP_ROCK_AMPLITUDE = 0.03 as const;     // side rock rotation in radians
export const SHIP_ROCK_SPEED = 0.5 as const;

// Asset
export const SHIP_MODEL_PATH = '/assets/models/main-ship.glb' as const;
export const SHIP_MODEL_MAX_SIZE_MB = 5 as const;
```

---

### 2. Ship Types — `src/three/objects/ship/ship.types.ts`

```typescript
// src/three/objects/ship/ship.types.ts

export type ShipPosition = {
  x: number;
  y: number;
  z: number;
};

export type ShipState = 'docked' | 'sailing' | 'idle';
```

---

### 3. Ship Loader — `src/three/loaders/ship.loader.ts`

**Purpose:** Centralizes all GLB loading for the ship. Components never call `useGLTF()` directly.

```typescript
// src/three/loaders/ship.loader.ts
// Owns: ship model loading — all GLB loading goes through loaders, never directly in components

import { useGLTF } from '@react-three/drei';
import { SHIP_MODEL_PATH } from '@/constants/ship.constants';

export function useShipModel() {
  // In Phase 1, if no GLB exists yet, we return null and use placeholder
  // When model is ready, uncomment:
  // const { scene } = useGLTF(SHIP_MODEL_PATH);
  // return { model: scene };
  return { model: null }; // Placeholder — swap for real model when asset is ready
}

// Preload ship model when possible
// useGLTF.preload(SHIP_MODEL_PATH);
```

---

### 4. Ship Component — `src/three/objects/ship/ship.tsx`

**Purpose:** Renders the ship in the world. Uses floating animation via `useFrame`. If model exists, renders it; otherwise renders placeholder geometry.

```typescript
// src/three/objects/ship/ship.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  SHIP_POSITION,
  SHIP_SCALE,
  SHIP_FLOAT_SPEED,
  SHIP_FLOAT_AMPLITUDE,
  SHIP_ROCK_AMPLITUDE,
  SHIP_ROCK_SPEED,
} from '@/constants/ship.constants';

// Placeholder geometry dimensions (used until real model is imported)
const PLACEHOLDER_WIDTH = 3 as const;
const PLACEHOLDER_HEIGHT = 2 as const;
const PLACEHOLDER_DEPTH = 8 as const;
const PLACEHOLDER_COLOR = '#3d2b1f' as const; // dark wood

export function Ship() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.getElapsedTime();

    // Idle floating: gentle vertical bob
    groupRef.current.position.y =
      SHIP_POSITION.y + Math.sin(time * SHIP_FLOAT_SPEED) * SHIP_FLOAT_AMPLITUDE;

    // Idle rocking: subtle side tilt
    groupRef.current.rotation.z =
      Math.sin(time * SHIP_ROCK_SPEED) * SHIP_ROCK_AMPLITUDE;
  });

  return (
    <group
      ref={groupRef}
      position={[SHIP_POSITION.x, SHIP_POSITION.y, SHIP_POSITION.z]}
      scale={[SHIP_SCALE.x, SHIP_SCALE.y, SHIP_SCALE.z]}
    >
      {/* Phase 1 Placeholder — replace with <primitive object={model} /> when GLB is ready */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[PLACEHOLDER_WIDTH, PLACEHOLDER_HEIGHT, PLACEHOLDER_DEPTH]} />
        <meshStandardMaterial color={PLACEHOLDER_COLOR} />
      </mesh>

      {/* Ship mast placeholder */}
      <mesh
        position={[0, PLACEHOLDER_HEIGHT + 2, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
        <meshStandardMaterial color="#2a1a0e" />
      </mesh>
    </group>
  );
}
```

---

### 5. Ship Barrel Export — `src/three/objects/ship/index.ts`

```typescript
export { Ship } from './ship';
```

---

## Island Deliverables

### 6. Island Types — `src/three/objects/island/island.types.ts`

```typescript
// src/three/objects/island/island.types.ts

import type { IslandDefinition } from '@/types/island.types';

export type IslandProps = {
  definition: IslandDefinition;
};

export type IslandBaseConfig = {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  segments: number;
};
```

---

### 7. Island Constants — `src/constants/island.constants.ts` (Update)

Add geometry constants to the existing island constants file:

```typescript
// Add to src/constants/island.constants.ts

// Island geometry (shared across all island types)
export const ISLAND_BASE_RADIUS_TOP = 8 as const;
export const ISLAND_BASE_RADIUS_BOTTOM = 12 as const;
export const ISLAND_BASE_HEIGHT = 3 as const;
export const ISLAND_BASE_SEGMENTS = 16 as const;
export const ISLAND_POSITION_Y = -1.5 as const;  // Partially submerged in ocean

// Island colors
export const ISLAND_SAND_COLOR = '#c2a87a' as const;
export const ISLAND_ROCK_COLOR = '#6b6047' as const;
export const ISLAND_GRASS_COLOR = '#2d5a27' as const;

// Palm tree positioning (relative to island center)
export const ISLAND_TREE_COUNT = 3 as const;
export const ISLAND_TREE_POSITIONS: Array<[number, number, number]> = [
  [-3, 0, 1],
  [2.5, 0, -2],
  [-1, 0, -4],
];
```

---

### 8. Island Base Component — `src/three/objects/island/island-base.tsx`

**Purpose:** Renders the physical island terrain (sandy mound, rock base). Shared across all island types.

```typescript
// src/three/objects/island/island-base.tsx

import * as THREE from 'three';
import {
  ISLAND_BASE_RADIUS_TOP,
  ISLAND_BASE_RADIUS_BOTTOM,
  ISLAND_BASE_HEIGHT,
  ISLAND_BASE_SEGMENTS,
  ISLAND_SAND_COLOR,
  ISLAND_ROCK_COLOR,
} from '@/constants/island.constants';

export function IslandBase() {
  return (
    <group>
      {/* Sandy top */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry
          args={[ISLAND_BASE_RADIUS_TOP, ISLAND_BASE_RADIUS_BOTTOM, ISLAND_BASE_HEIGHT, ISLAND_BASE_SEGMENTS]}
        />
        <meshStandardMaterial color={ISLAND_SAND_COLOR} roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Submerged rock base */}
      <mesh receiveShadow position={[0, -ISLAND_BASE_HEIGHT * 0.6, 0]}>
        <cylinderGeometry
          args={[ISLAND_BASE_RADIUS_BOTTOM * 0.95, ISLAND_BASE_RADIUS_BOTTOM * 1.1, ISLAND_BASE_HEIGHT, ISLAND_BASE_SEGMENTS]}
        />
        <meshStandardMaterial color={ISLAND_ROCK_COLOR} roughness={1.0} metalness={0.0} />
      </mesh>
    </group>
  );
}
```

---

### 9. Palm Tree Component — `src/three/objects/environment-props/palm-tree.tsx`

**Purpose:** Reusable palm tree. Since multiple trees are placed per island, geometry is shared.

```typescript
// src/three/objects/environment-props/palm-tree.tsx

import * as THREE from 'three';

const TRUNK_COLOR = '#5c3d1e' as const;
const LEAF_COLOR = '#2d7a2a' as const;
const TRUNK_HEIGHT = 3.5 as const;
const TRUNK_RADIUS = 0.15 as const;
const LEAF_RADIUS = 1.8 as const;

type PalmTreeProps = {
  position: [number, number, number];
  rotation?: number; // Y-axis rotation in radians
};

export function PalmTree({ position, rotation = 0 }: PalmTreeProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Trunk */}
      <mesh
        position={[0, TRUNK_HEIGHT / 2, 0]}
        rotation={[0, 0, 0.15]} // Slight lean
        castShadow
      >
        <cylinderGeometry args={[TRUNK_RADIUS * 0.7, TRUNK_RADIUS, TRUNK_HEIGHT, 6]} />
        <meshStandardMaterial color={TRUNK_COLOR} roughness={0.9} />
      </mesh>

      {/* Leaf cluster */}
      <mesh position={[0, TRUNK_HEIGHT + 0.5, 0]} castShadow>
        <coneGeometry args={[LEAF_RADIUS, 2, 8]} />
        <meshStandardMaterial color={LEAF_COLOR} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
```

---

### 10. Island Component — `src/three/objects/island/island.tsx`

**Purpose:** The single, generic Island component. Configured entirely by `IslandDefinition`. Never create `HomeIsland`, `SkillsIsland`, etc. separate files.

```typescript
// src/three/objects/island/island.tsx
// THE single Island component — all islands are configured instances of this

import { IslandBase } from './island-base';
import { PalmTree } from '@/three/objects/environment-props/palm-tree';
import {
  ISLAND_POSITION_Y,
  ISLAND_TREE_POSITIONS,
} from '@/constants/island.constants';
import type { IslandProps } from './island.types';

export function Island({ definition }: IslandProps) {
  const { position } = definition;

  return (
    <group
      position={[position.x, position.y + ISLAND_POSITION_Y, position.z]}
      name={`island-${definition.id}`}
    >
      {/* Island terrain base */}
      <IslandBase />

      {/* Palm trees — same for all island types in Phase 1 */}
      {ISLAND_TREE_POSITIONS.map((treePos, index) => (
        <PalmTree
          key={`${definition.id}-tree-${index}`}
          position={treePos}
          rotation={(index * Math.PI) / 3}
        />
      ))}
    </group>
  );
}
```

---

### 11. World Islands Composer — `src/three/world/world-islands.tsx`

**Purpose:** Renders all islands from `ISLAND_DEFINITIONS`. This is how the world stays data-driven.

```typescript
// src/three/world/world-islands.tsx
// Reads ISLAND_DEFINITIONS and renders all islands — fully data-driven

import { Island } from '@/three/objects/island/island';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';

export function WorldIslands() {
  return (
    <group name="world-islands">
      {ISLAND_DEFINITIONS.map((definition) => (
        <Island
          key={definition.id}
          definition={definition}
        />
      ))}
    </group>
  );
}
```

---

### 12. Barrel Exports

```typescript
// src/three/objects/island/index.ts
export { Island } from './island';
export { IslandBase } from './island-base';
```

```typescript
// src/three/objects/environment-props/index.ts
export { PalmTree } from './palm-tree';
```

```typescript
// src/three/objects/ship/index.ts
export { Ship } from './ship';
```

---

### 13. Update World Composition

```typescript
// src/three/world/world.tsx
import { WorldEnvironment } from '@/three/environment/world-environment';
import { Ocean } from '@/three/objects/ocean';
import { WorldCamera } from '@/three/cameras/world-camera';
import { Ship } from '@/three/objects/ship';
import { WorldIslands } from '@/three/world/world-islands';

export function World() {
  return (
    <>
      <WorldCamera />
      <WorldEnvironment />
      <Ocean />
      <Ship />
      <WorldIslands />
      {/* Future: <NavigationRoutes /> */}
    </>
  );
}
```

---

## Asset Pipeline — For When Real Models Are Ready

When a real ship GLB is downloaded and ready, the process is:

1. **Download** from Sketchfab, Poly Pizza, or CGTrader
2. **Review** — check poly count, materials, file size (max 5MB for ship, 2MB per island)
3. **Optimize** using gltf-transform or Blender (reduce polygons, bake textures)
4. **Compress** using gltf-transform compress (KTX2 textures)
5. **Rename** following convention: `main-ship.glb`
6. **Place** in `src/assets/models/`
7. **Update** `ship.loader.ts` to uncomment `useGLTF(SHIP_MODEL_PATH)`

**NEVER import a raw, unoptimized model.**

---

## Performance Requirements

| Object         | Max Draw Calls | Max File Size |
|----------------|----------------|---------------|
| Ship           | 2–5            | 5 MB          |
| Island (each)  | 3–6            | 2 MB          |
| Palm tree      | 2 per tree     | —             |
| Total scene    | < 50           | —             |

---

## Files to Create / Modify

| Action   | File                                                  |
|----------|-------------------------------------------------------|
| CREATE   | `src/three/objects/ship/ship.tsx`                     |
| CREATE   | `src/three/objects/ship/ship.types.ts`                |
| CREATE   | `src/three/objects/ship/index.ts`                     |
| CREATE   | `src/three/objects/island/island.tsx`                 |
| CREATE   | `src/three/objects/island/island-base.tsx`            |
| CREATE   | `src/three/objects/island/island.types.ts`            |
| CREATE   | `src/three/objects/island/index.ts`                   |
| CREATE   | `src/three/objects/environment-props/palm-tree.tsx`   |
| CREATE   | `src/three/objects/environment-props/index.ts`        |
| CREATE   | `src/three/loaders/ship.loader.ts`                    |
| CREATE   | `src/three/world/world-islands.tsx`                   |
| MODIFY   | `src/constants/island.constants.ts` (add geometry constants) |
| MODIFY   | `src/constants/ship.constants.ts` (new file)          |
| MODIFY   | `src/three/world/world.tsx` (add Ship + WorldIslands) |

---

## Engineering Rules to Enforce

- ❌ FORBIDDEN: Creating `HomeIsland.tsx`, `SkillsIsland.tsx`, etc. — ONE generic `Island` component only
- ❌ No hardcoded island positions in components — positions come from `ISLAND_DEFINITIONS`
- ❌ No direct `useGLTF()` inside object components — must go through `ship.loader.ts`
- ❌ No magic numbers in any component
- ✅ Island system is data-driven — `WorldIslands` reads `ISLAND_DEFINITIONS` and maps
- ✅ Palm trees placed via constants, not hardcoded offsets
- ✅ Ship idle animation only runs inside `useFrame` — nothing else in `useFrame`
- ✅ Each object component has its own folder with `index.ts` barrel

---

## Acceptance Criteria

- [ ] Ship visible at world center `(0, 0, 0)` in ocean
- [ ] Ship has subtle idle bobbing animation (up/down)
- [ ] Ship has subtle rocking animation (side tilt)
- [ ] All islands from `ISLAND_DEFINITIONS` are rendered at their correct positions
- [ ] Each island shows base terrain (sand mound)
- [ ] Each island shows palm trees
- [ ] Island system is purely data-driven — adding a new island requires only adding to `ISLAND_DEFINITIONS`
- [ ] No TypeScript errors
- [ ] FPS remains 60 desktop with full scene (ocean + ship + islands)
- [ ] Draw calls documented in PR

---

## Definition of Done

- [ ] All files created and committed
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] Scene shows ship at center + multiple islands scattered in ocean
- [ ] Ship animation is working
- [ ] PR includes screenshot of full prototype scene
- [ ] Performance metrics (FPS, draw calls) documented in PR
