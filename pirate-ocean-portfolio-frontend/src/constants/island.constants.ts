// island.constants.ts
// All island world definitions and geometry values.
// ISLAND_DEFINITIONS is the single source of truth — every island in the world comes from here.
// ISLAND_GEOMETRY groups all shape/color constants.

import type { IslandDefinition } from '@/types/island.types';

// ─────────────────────────────────────────────────────────────
// World Island Definitions
// To add a new island: add one entry here. No other file needs to change.
// ─────────────────────────────────────────────────────────────
export const ISLAND_DEFINITIONS: IslandDefinition[] = [
  {
    id: 'home-island',
    type: 'home',
    label: 'Home Island',
    position: { x: -30, y: 0, z: 0 },
    isUnlocked: true,
  },
  {
    id: 'skills-island',
    type: 'skills',
    label: 'Skills Island',
    position: { x: 0, y: 0, z: -40 },
    isUnlocked: true,
  },
  {
    id: 'experience-island',
    type: 'experience',
    label: 'Experience Island',
    position: { x: 35, y: 0, z: -15 },
    isUnlocked: true,
  },
  {
    id: 'achievement-island',
    type: 'achievement',
    label: 'Achievement Island',
    position: { x: 30, y: 0, z: 20 },
    isUnlocked: true,
  },
  {
    id: 'harbor-island',
    type: 'harbor',
    label: 'Harbor Island',
    position: { x: 0, y: 0, z: 40 },
    isUnlocked: true,
  },
] as const;

// ─────────────────────────────────────────────────────────────
// Island Geometry Constants
// All shape, size, and color values for 3D island rendering
// ─────────────────────────────────────────────────────────────
export const ISLAND_GEOMETRY = {
  // Base terrain shape
  BASE_RADIUS_TOP: 8,
  BASE_RADIUS_BOTTOM: 12,
  BASE_HEIGHT: 3,
  BASE_SEGMENTS: 16,
  POSITION_Y: -1.5,       // Islands sit partially submerged in the ocean

  // Colors
  SAND_COLOR: '#c2a87a',
  ROCK_COLOR: '#6b6047',
  GRASS_COLOR: '#2d5a27',

  // Palm tree placement relative to island center
  TREE_COUNT: 3,
  TREE_POSITIONS: [
    [-3, 0, 1],
    [2.5, 0, -2],
    [-1, 0, -4],
  ] as [number, number, number][],
} as const;

// ─────────────────────────────────────────────────────────────
// Island Interaction Constants
// ─────────────────────────────────────────────────────────────
export const ISLAND_INTERACTION = {
  SELECTED_SCALE: 1.05,        // scale boost when island is selected
  HOVER_EMISSIVE_BOOST: 0.3,   // emissive intensity added on hover
} as const;
