// world.types.ts
// Shared types for world state and world objects
// These are the core types that define what the 3D world IS

export type WorldLoadingStatus = 'idle' | 'loading' | 'ready' | 'error';

export type WorldState = {
  loadingStatus: WorldLoadingStatus;
  isWorldLoaded: boolean;
};
