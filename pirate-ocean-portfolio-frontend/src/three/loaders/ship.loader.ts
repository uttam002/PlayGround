// ship.loader.ts
// Owns: ship model loading — all GLB loading goes through loaders, never directly in components

import { useGLTF } from '@react-three/drei';
import { SHIP } from '@/constants/ship.constants';

export function useShipModel() {
  // In Phase 1, if no GLB exists yet, we return null and use placeholder
  // When model is ready, uncomment:
  // const { scene } = useGLTF(SHIP.MODEL_PATH);
  // return { model: scene };
  return { model: null }; // Placeholder — swap for real model when asset is ready
}

// Preload ship model when possible
// useGLTF.preload(SHIP.MODEL_PATH);
