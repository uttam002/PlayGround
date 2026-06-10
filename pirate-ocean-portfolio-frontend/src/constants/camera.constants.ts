// camera.constants.ts
// All static values that control the camera system.
// Grouped as a single CAMERA object — access via CAMERA.FOV, CAMERA.CINEMATIC.POSITION, etc.

export const CAMERA = {
  // Lens settings
  FOV: 60,
  NEAR_PLANE: 0.1,
  FAR_PLANE: 1000,
  DEFAULT_DISTANCE: 17,

  // Transition settings
  TRANSITION_DURATION: 1.5,           // seconds (GSAP animation)
  TRANSITION_EASE: 'power3.inOut',    // GSAP easing string

  // Cinematic Mode — dramatic landing angle (user first sees this on load)
  CINEMATIC: {
    POSITION: { x: 8, y: 12, z: 18 },
    TARGET: { x: 0, y: 0, z: 0 },
  },

  // Exploration Mode — high overhead view for world map navigation
  EXPLORATION: {
    POSITION: { x: 0, y: 55, z: 35 },
    TARGET: { x: 0, y: 0, z: 0 },
  },

  // Focus Mode — close to a specific island (position set dynamically)
  FOCUS: {
    HEIGHT_OFFSET: 15,   // how many units above island center
    DISTANCE_OFFSET: 20, // how many units away from island
  },

  // Return Mode — same destination as exploration
  RETURN: {
    POSITION: { x: 0, y: 55, z: 35 },
    TARGET: { x: 0, y: 0, z: 0 },
  },
} as const;
