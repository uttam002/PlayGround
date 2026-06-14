// ship.constants.ts
// All static values that control the ship system.
// Grouped as a single SHIP object — access via SHIP.POSITION, etc.

export const SHIP = {
  POSITION: { x: 0, y: 0, z: 0 },
  SCALE: { x: 1, y: 1, z: 1 },

  // Idle floating animation
  FLOAT_SPEED: 0.8,         // animation speed
  FLOAT_AMPLITUDE: 0.15,    // up/down distance in world units
  ROCK_AMPLITUDE: 0.03,     // side rock rotation in radians
  ROCK_SPEED: 0.5,

  // Asset
  MODEL_PATH: '/assets/models/main-ship.glb',
  MODEL_MAX_SIZE_MB: 5,
} as const;
