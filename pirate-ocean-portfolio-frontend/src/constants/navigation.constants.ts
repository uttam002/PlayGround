// navigation.constants.ts
// All values related to route rendering and navigation interactions.
// Grouped as NAVIGATION_ROUTE (visual) and NAVIGATION (logic).

export const NAVIGATION_ROUTE = {
  // Route line colors
  COLOR_DEFAULT: '#4a7fa8',    // normal ocean-blue route line
  COLOR_HOVER: '#7ecfff',      // brightens when hovering destination island
  COLOR_ACTIVE: '#ffcc44',     // gold when island is selected

  // Route line opacity
  OPACITY_DEFAULT: 0.4,
  OPACITY_HOVER: 0.85,
  OPACITY_ACTIVE: 1.0,

  // Route line appearance
  LINE_WIDTH: 1,               // Note: WebGL doesn't support linewidth > 1 natively
  DASH_SIZE: 2,
  GAP_SIZE: 1,
} as const;

// Ship hub is the center of all routes — all route lines start from here
export const SHIP_HUB = {
  POSITION: { x: 0, y: 0, z: 0 },
  ID: 'ship-hub',
} as const;
