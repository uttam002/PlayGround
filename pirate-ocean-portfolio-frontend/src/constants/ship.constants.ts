// ship.constants.ts
// All static values for ship placement, animation, and asset loading.
// Grouped as a single SHIP object — access via SHIP.POSITION, SHIP.FLOAT.SPEED, etc.

export const SHIP = {
  // World position (ship hub — center of the world)
  POSITION: { x: 0, y: 0, z: 0 },
  SCALE: { x: 1, y: 1, z: 1 },

  // Idle floating animation
  FLOAT: {
    SPEED: 0.8,         // animation speed multiplier
    AMPLITUDE: 0.15,    // vertical bob distance in world units
  },

  // Idle rocking animation
  ROCK: {
    SPEED: 0.5,
    AMPLITUDE: 0.03,    // side tilt in radians
  },

  // Asset
  MODEL_PATH: '/assets/models/main-ship.glb',
  MODEL_MAX_SIZE_MB: 5,

  // Placeholder geometry (used until real model is imported)
  PLACEHOLDER: {
    WIDTH: 3,
    HEIGHT: 2,
    DEPTH: 8,
    COLOR: '#3d2b1f',        // dark wood
    MAST_COLOR: '#2a1a0e',
    MAST_HEIGHT: 5,
    MAST_RADIUS: 0.08,
  },
} as const;
