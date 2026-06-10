// navigation.config.ts
// Runtime configuration for the navigation system.
// Controls behavior of island-to-island travel and route rendering.

export const NavigationConfig = {
  // Whether travel animation is enabled (Phase 2 feature)
  enableTravelAnimation: false,

  // How long before a hover interaction registers (prevents accidental triggers)
  hoverDebounceMs: 80,

  // Whether clicking ocean/canvas clears selection
  clearSelectionOnCanvasClick: true,
} as const;
