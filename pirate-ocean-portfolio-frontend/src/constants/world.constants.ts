// world.constants.ts
// All static values that define the 3D world dimensions, colors, and rules.
// Grouped as a single WORLD object — access via WORLD.FOG_COLOR, WORLD.OCEAN_SIZE, etc.

export const WORLD = {
  // Scene Background
  BACKGROUND_COLOR: '#050510',

  // Fog settings
  FOG_COLOR: '#0a0a1a',
  FOG_NEAR: 50,
  FOG_FAR: 300,
  FOG_DENSITY: 0.007,

  // Ocean surface
  OCEAN_SIZE: 500,           // world units (width x depth of ocean plane)
  OCEAN_SEGMENTS: 128,       // vertex subdivisions (lower = faster, less detail)
  OCEAN_POSITION_Y: -1,      // ocean sits slightly below origin

  // Ocean wave animation
  OCEAN_WAVE_SPEED: 0.5,
  OCEAN_WAVE_HEIGHT: 0.3,    // max wave amplitude in world units
  OCEAN_WAVE_FREQUENCY: 0.08,

  // Ocean material colors
  OCEAN_BASE_COLOR: '#0a1628',
  OCEAN_EMISSIVE_COLOR: '#0d2040',
  OCEAN_EMISSIVE_INTENSITY: 0.2,
  OCEAN_METALNESS: 0.9,
  OCEAN_ROUGHNESS: 0.1,
  OCEAN_OPACITY: 0.92,
} as const;
