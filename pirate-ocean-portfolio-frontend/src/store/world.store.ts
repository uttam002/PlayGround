// world.store.ts
// Owns: global 3D world state — loading status, scene readiness
//
// Data flow: Config → Constants → Store → Features → Components
// This store is read by: WorldScene (feature), WorldCanvas (3D core)

import { create } from 'zustand';

type WorldStore = {
  // ─── State ───
  isWorldLoaded: boolean;

  // ─── Actions ───
  setWorldLoaded: (loaded: boolean) => void;
};

export const useWorldStore = create<WorldStore>((set) => ({
  // State
  isWorldLoaded: false,

  // Actions
  setWorldLoaded: (loaded) => set({ isWorldLoaded: loaded }),
}));

// ─── Selectors ───
// Use selectors when subscribing in components to prevent unnecessary re-renders
export const selectIsWorldLoaded = (state: WorldStore) => state.isWorldLoaded;
