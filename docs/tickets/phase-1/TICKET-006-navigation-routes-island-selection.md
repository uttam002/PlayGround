# TICKET-006 — Navigation Routes & Island Selection

## Ticket Metadata

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **ID**       | TICKET-006                                         |
| **Phase**    | Phase 1 — World Foundation                         |
| **Priority** | 🟠 High                                            |
| **Type**     | 3D / Navigation / System                           |
| **Estimated Effort** | 2–3 days                                 |
| **Depends On** | TICKET-001, TICKET-004, TICKET-005             |
| **Blocks**   | TICKET-007 (UI overlay needs navigation events)    |
| **Branch**   | `feature/navigation-routes-island-selection`       |

---

## Objective

Build the world navigation system — visual route lines between islands, island hover/click interaction (selection), and the state management that connects 3D user interactions to the application layer.

**Version 1 scope (this ticket):**
- ✅ Visual navigation route lines rendered between ship hub and each island
- ✅ Routes highlighted on island hover
- ✅ Island click emits selection event to navigation store
- ✅ Camera transitions to `exploration` mode when world map is requested
- ✅ Selected island highlighted
- ❌ No ship travel animation yet (Phase 2)
- ❌ No pathfinding logic yet (Phase 2)
- ❌ No island content panels yet (TICKET-007 handles UI layer)

**Success criteria:** User can hover over islands (they highlight). User can click an island (it becomes selected). Navigation route lines are visible. State updates correctly.

---

## Architecture Rule

**3D interactions must emit events, never directly control UI.**

```
Island click (Three.js)
    ↓
Emit event → Navigation Store
    ↓
React reads store
    ↓
React decides what UI to show
```

Three.js components must never directly open modals, navigate routes, or call APIs. They emit. React responds.

---

## Scope

**Primary paths:**
```
src/three/objects/island/
src/three/world/
src/store/navigation.store.ts
src/hooks/use-navigation.ts
src/constants/navigation.constants.ts
src/types/navigation.types.ts
```

---

## Deliverables

### 1. Navigation Constants — `src/constants/navigation.constants.ts`

```typescript
// src/constants/navigation.constants.ts
// Defines route rendering and interaction constants

export const ROUTE_LINE_COLOR = '#4a7fa8' as const;         // Ocean blue route line
export const ROUTE_LINE_COLOR_HOVER = '#7ecfff' as const;   // Bright on hover
export const ROUTE_LINE_COLOR_ACTIVE = '#ffcc44' as const;  // Gold when island selected
export const ROUTE_LINE_OPACITY = 0.4 as const;
export const ROUTE_LINE_OPACITY_HOVER = 0.85 as const;
export const ROUTE_LINE_OPACITY_ACTIVE = 1.0 as const;
export const ROUTE_LINE_WIDTH = 1 as const;                 // Note: Three.js Line width > 1 not supported in WebGL
export const ROUTE_LINE_DASH_SIZE = 2 as const;
export const ROUTE_LINE_GAP_SIZE = 1 as const;

export const ISLAND_HOVER_COLOR_BOOST = 0.3 as const;       // Emissive boost on hover
export const ISLAND_SELECTED_SCALE = 1.05 as const;         // Slight scale up when selected

// Ship hub origin — all routes start from here
export const SHIP_HUB_POSITION = { x: 0, y: 0, z: 0 } as const;
```

---

### 2. Navigation Types — Update `src/types/navigation.types.ts`

```typescript
// src/types/navigation.types.ts
// Complete navigation type definitions

export type NavigationRoute = {
  id: string;
  fromId: string;            // 'ship-hub' or island id
  toId: string;              // target island id
  isActive: boolean;         // true when destination is selected
  isHighlighted: boolean;    // true when hovering the destination island
};

export type NavigationState = {
  selectedIslandId: string | null;
  hoveredIslandId: string | null;
  routes: NavigationRoute[];
};

export type IslandSelectEvent = {
  islandId: string;
  timestamp: number;
};
```

---

### 3. Full Navigation Store — `src/store/navigation.store.ts`

```typescript
// src/store/navigation.store.ts
// Owns: island selection, hover state, navigation routes

import { create } from 'zustand';
import type { NavigationRoute, NavigationState } from '@/types/navigation.types';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';
import { SHIP_HUB_POSITION } from '@/constants/navigation.constants';

type NavigationStore = NavigationState & {
  // Actions
  selectIsland: (islandId: string | null) => void;
  hoverIsland: (islandId: string | null) => void;
  clearSelection: () => void;
};

// Build initial routes from island definitions — all routes from ship hub
function buildInitialRoutes(): NavigationRoute[] {
  return ISLAND_DEFINITIONS.map((island) => ({
    id: `route-ship-hub-to-${island.id}`,
    fromId: 'ship-hub',
    toId: island.id,
    isActive: false,
    isHighlighted: false,
  }));
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  // State
  selectedIslandId: null,
  hoveredIslandId: null,
  routes: buildInitialRoutes(),

  // Actions
  selectIsland: (islandId) =>
    set((state) => ({
      selectedIslandId: islandId,
      routes: state.routes.map((route) => ({
        ...route,
        isActive: route.toId === islandId,
      })),
    })),

  hoverIsland: (islandId) =>
    set((state) => ({
      hoveredIslandId: islandId,
      routes: state.routes.map((route) => ({
        ...route,
        isHighlighted: route.toId === islandId,
      })),
    })),

  clearSelection: () =>
    set({
      selectedIslandId: null,
      hoveredIslandId: null,
      routes: buildInitialRoutes(),
    }),
}));

// Selectors
export const selectSelectedIslandId = (state: NavigationStore) =>
  state.selectedIslandId;
export const selectHoveredIslandId = (state: NavigationStore) =>
  state.hoveredIslandId;
export const selectRoutes = (state: NavigationStore) => state.routes;
```

---

### 4. Navigation Hook — `src/hooks/use-navigation.ts`

**Purpose:** Public React API for all navigation interactions. UI components call this hook — they never call store actions directly.

```typescript
// src/hooks/use-navigation.ts
// Public API for navigation — UI and features call this, not the store directly

import { useCallback } from 'react';
import { useNavigationStore } from '@/store/navigation.store';
import { useCameraStore } from '@/store/camera.store';

export function useNavigation() {
  const {
    selectedIslandId,
    hoveredIslandId,
    routes,
    selectIsland,
    hoverIsland,
    clearSelection,
  } = useNavigationStore();

  const setCameraMode = useCameraStore((s) => s.setCameraMode);

  // Select island and transition camera to focus mode
  const navigateToIsland = useCallback(
    (islandId: string) => {
      selectIsland(islandId);
      setCameraMode('focus'); // Camera system reads this and transitions
    },
    [selectIsland, setCameraMode]
  );

  // Return to world map
  const returnToWorldMap = useCallback(() => {
    clearSelection();
    setCameraMode('exploration');
  }, [clearSelection, setCameraMode]);

  return {
    selectedIslandId,
    hoveredIslandId,
    routes,
    navigateToIsland,
    returnToWorldMap,
    hoverIsland,
    clearSelection,
  };
}
```

---

### 5. Navigation Route Line — `src/three/objects/navigation-routes/navigation-route-line.tsx`

**Purpose:** Renders a single dashed line from ship hub to an island. Reacts to active/highlighted state.

```typescript
// src/three/objects/navigation-routes/navigation-route-line.tsx
'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import type { NavigationRoute } from '@/types/navigation.types';
import type { IslandDefinition } from '@/types/island.types';
import {
  ROUTE_LINE_COLOR,
  ROUTE_LINE_COLOR_HOVER,
  ROUTE_LINE_COLOR_ACTIVE,
  ROUTE_LINE_OPACITY,
  ROUTE_LINE_OPACITY_HOVER,
  ROUTE_LINE_OPACITY_ACTIVE,
  SHIP_HUB_POSITION,
} from '@/constants/navigation.constants';

type NavigationRouteLineProps = {
  route: NavigationRoute;
  targetIsland: IslandDefinition;
};

export function NavigationRouteLine({ route, targetIsland }: NavigationRouteLineProps) {
  const points = useMemo(() => {
    return [
      new THREE.Vector3(SHIP_HUB_POSITION.x, 0.5, SHIP_HUB_POSITION.z),
      new THREE.Vector3(targetIsland.position.x, 0.5, targetIsland.position.z),
    ];
  }, [targetIsland.position]);

  const lineColor = route.isActive
    ? ROUTE_LINE_COLOR_ACTIVE
    : route.isHighlighted
    ? ROUTE_LINE_COLOR_HOVER
    : ROUTE_LINE_COLOR;

  const lineOpacity = route.isActive
    ? ROUTE_LINE_OPACITY_ACTIVE
    : route.isHighlighted
    ? ROUTE_LINE_OPACITY_HOVER
    : ROUTE_LINE_OPACITY;

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={lineColor}
        transparent
        opacity={lineOpacity}
        depthWrite={false}
      />
    </line>
  );
}
```

---

### 6. All Navigation Routes — `src/three/objects/navigation-routes/navigation-routes.tsx`

**Purpose:** Renders all route lines using store data. Data-driven — no hardcoded routes.

```typescript
// src/three/objects/navigation-routes/navigation-routes.tsx
'use client';

import { useNavigationStore } from '@/store/navigation.store';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';
import { NavigationRouteLine } from './navigation-route-line';

export function NavigationRoutes() {
  const routes = useNavigationStore((s) => s.routes);

  return (
    <group name="navigation-routes">
      {routes.map((route) => {
        const targetIsland = ISLAND_DEFINITIONS.find((island) => island.id === route.toId);
        if (!targetIsland) return null;

        return (
          <NavigationRouteLine
            key={route.id}
            route={route}
            targetIsland={targetIsland}
          />
        );
      })}
    </group>
  );
}
```

---

### 7. Interactive Island Wrapper — Update Island Component

Update `src/three/objects/island/island.tsx` to support hover and click events:

```typescript
// src/three/objects/island/island.tsx
// Add interactivity — island emits events, never controls UI directly

'use client';

import { useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { IslandBase } from './island-base';
import { PalmTree } from '@/three/objects/environment-props/palm-tree';
import { useNavigationStore } from '@/store/navigation.store';
import {
  ISLAND_POSITION_Y,
  ISLAND_TREE_POSITIONS,
} from '@/constants/island.constants';
import type { IslandProps } from './island.types';

export function Island({ definition }: IslandProps) {
  const { position, id } = definition;
  const groupRef = useRef<THREE.Group>(null);

  const hoverIsland = useNavigationStore((s) => s.hoverIsland);
  const selectIsland = useNavigationStore((s) => s.selectIsland);
  const selectedIslandId = useNavigationStore((s) => s.selectedIslandId);

  const isSelected = selectedIslandId === id;

  // Hover in — emit to store
  function handlePointerEnter(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    hoverIsland(id);
    document.body.style.cursor = 'pointer';
  }

  // Hover out — emit to store
  function handlePointerLeave() {
    hoverIsland(null);
    document.body.style.cursor = 'default';
  }

  // Click — emit to store (UI layer decides what to do)
  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    selectIsland(id);
  }

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y + ISLAND_POSITION_Y, position.z]}
      name={`island-${id}`}
      scale={isSelected ? 1.05 : 1}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <IslandBase />
      {ISLAND_TREE_POSITIONS.map((treePos, index) => (
        <PalmTree
          key={`${id}-tree-${index}`}
          position={treePos}
          rotation={(index * Math.PI) / 3}
        />
      ))}
    </group>
  );
}
```

---

### 8. Barrel Exports

```typescript
// src/three/objects/navigation-routes/index.ts
export { NavigationRoutes } from './navigation-routes';
export { NavigationRouteLine } from './navigation-route-line';
```

```typescript
// src/hooks/index.ts (update)
export { useCamera } from './use-camera';
export { useNavigation } from './use-navigation';
```

---

### 9. Add Navigation Routes to World

```typescript
// src/three/world/world.tsx
import { WorldEnvironment } from '@/three/environment/world-environment';
import { Ocean } from '@/three/objects/ocean';
import { WorldCamera } from '@/three/cameras/world-camera';
import { Ship } from '@/three/objects/ship';
import { WorldIslands } from '@/three/world/world-islands';
import { NavigationRoutes } from '@/three/objects/navigation-routes';

export function World() {
  return (
    <>
      <WorldCamera />
      <WorldEnvironment />
      <Ocean />
      <Ship />
      <WorldIslands />
      <NavigationRoutes />
    </>
  );
}
```

---

## Interaction Flow Diagram

```
USER hovers island
    ↓
Three.js onPointerEnter fires on Island group
    ↓
island.tsx → hoverIsland(id) → navigation.store
    ↓
navigation.store updates:
  - hoveredIslandId = id
  - route with toId === id → isHighlighted = true
    ↓
NavigationRouteLine reads store → re-renders with brighter color
Route is now highlighted

USER clicks island
    ↓
Three.js onClick fires on Island group
    ↓
island.tsx → selectIsland(id) → navigation.store
    ↓
navigation.store updates:
  - selectedIslandId = id
  - route with toId === id → isActive = true
    ↓
UI Overlay (TICKET-007) reads selectedIslandId → shows island info panel
Camera system reads store → transitions to focus mode
```

---

## Files to Create / Modify

| Action   | File                                                               |
|----------|--------------------------------------------------------------------|
| CREATE   | `src/three/objects/navigation-routes/navigation-route-line.tsx`   |
| CREATE   | `src/three/objects/navigation-routes/navigation-routes.tsx`       |
| CREATE   | `src/three/objects/navigation-routes/index.ts`                    |
| CREATE   | `src/hooks/use-navigation.ts`                                      |
| MODIFY   | `src/store/navigation.store.ts` (full implementation)             |
| MODIFY   | `src/types/navigation.types.ts` (add NavigationRoute, state types)|
| MODIFY   | `src/constants/navigation.constants.ts` (new file)                |
| MODIFY   | `src/three/objects/island/island.tsx` (add hover/click handlers)  |
| MODIFY   | `src/three/world/world.tsx` (add NavigationRoutes)                |

---

## Engineering Rules to Enforce

- ❌ Three.js interaction handlers (onClick, onPointerEnter) MUST NOT open modals or navigate directly
- ❌ No business logic inside Three.js event handlers — emit to store only
- ❌ No hardcoded island-to-route mapping — all derived from `ISLAND_DEFINITIONS`
- ✅ Cursor changes (`pointer` / `default`) must be restored on `onPointerLeave`
- ✅ `event.stopPropagation()` used in all island event handlers (prevent bubbling to canvas)
- ✅ Route lines use constants for all colors/opacities — never inline hex strings
- ✅ `useNavigationStore` selectors used (not whole store destructure)

---

## Acceptance Criteria

- [ ] Route lines visible from ship hub to all island positions
- [ ] Hovering an island highlights the corresponding route line (brighter)
- [ ] Clicking an island sets `selectedIslandId` in store (verifiable in React DevTools)
- [ ] Selected island has slight scale boost (`1.05`)
- [ ] Cursor changes to `pointer` on island hover, returns to `default` on leave
- [ ] Active route line renders gold color
- [ ] Clicking empty ocean/canvas deselects (or at minimum, second click deselects)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] FPS still 60 desktop with routes + interaction

---

## Definition of Done

- [ ] All files created and committed
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] Island hover + click + route highlight all work in dev server
- [ ] Navigation store state verified in React DevTools
- [ ] PR includes video/GIF of hover + click interaction
