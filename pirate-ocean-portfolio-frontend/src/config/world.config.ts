// world.config.ts
// Runtime configuration that controls world behavior.
// Unlike constants (which never change), config values control feature flags and tunable settings.

export const WorldConfig = {
  // Rendering features
  enableShadows: true,
  enableFog: true,
  enablePostProcessing: false,   // Enable in Phase 2+ after performance baseline is set

  // World limits
  maxIslandCount: 10,

  // Performance targets (used for monitoring/assertions)
  targetFps: {
    desktop: 60,
    laptop: 50,
    mobile: 30,
  },

  // World initialization budget
  maxLoadTimeSeconds: 3,
} as const;
