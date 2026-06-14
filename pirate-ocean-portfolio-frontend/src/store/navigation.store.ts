// navigation.store.ts
// Owns: island selection state, hover state, route active states
//
// This store is read by:
//   - island.tsx (Three.js) — to know which island is selected/hovered
//   - navigation-route-line.tsx (Three.js) — to know which routes to highlight
//   - island-info-panel.tsx (React UI) — to show selected island details

import { create } from 'zustand';
import type { NavigationState, NavigationRoute } from '@/types/navigation.types';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';

type NavigationStore = NavigationState & {
  // ─── Actions ───
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
  // ─── State ───
  selectedIslandId: null,
  hoveredIslandId: null,
  routes: buildInitialRoutes(),

  // ─── Actions ───
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
    set((state) => ({
      selectedIslandId: null,
      hoveredIslandId: null,
      routes: state.routes.map((route) => ({
        ...route,
        isActive: false,
        isHighlighted: false,
      })),
    })),
}));

// ─── Selectors ───
export const selectSelectedIslandId = (state: NavigationStore) =>
  state.selectedIslandId;
export const selectHoveredIslandId = (state: NavigationStore) =>
  state.hoveredIslandId;
export const selectRoutes = (state: NavigationStore) => state.routes;
