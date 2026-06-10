// camera.store.ts
// Owns: camera mode, transition status, and focus target island
//
// This store is read by:
//   - world-camera.tsx (Three.js) — executes GSAP transitions when mode changes
//   - use-camera.ts (hook) — exposes public API for mode switching to UI
//   - camera-debug-panel.tsx (dev only) — shows current mode

import { create } from 'zustand';
import type { CameraState, CameraMode } from '@/types/camera.types';

type CameraStore = CameraState & {
  // ─── Actions ───
  setCameraMode: (mode: CameraMode) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  setFocusTarget: (islandId: string | null) => void;
};

export const useCameraStore = create<CameraStore>((set) => ({
  // ─── State ───
  mode: 'cinematic',         // always starts in cinematic (landing view)
  isTransitioning: false,
  focusTargetId: null,

  // ─── Actions ───
  setCameraMode: (mode) => set({ mode }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  setFocusTarget: (focusTargetId) => set({ focusTargetId }),
}));

// ─── Selectors ───
export const selectCameraMode = (state: CameraStore) => state.mode;
export const selectIsTransitioning = (state: CameraStore) => state.isTransitioning;
export const selectFocusTargetId = (state: CameraStore) => state.focusTargetId;
