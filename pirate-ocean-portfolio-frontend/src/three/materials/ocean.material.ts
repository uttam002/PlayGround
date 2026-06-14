import * as THREE from 'three';
import { WORLD } from '@/constants/world.constants';

// Singleton material — create once, share everywhere
let oceanMaterialInstance: THREE.MeshStandardMaterial | null = null;

export function getOceanMaterial(): THREE.MeshStandardMaterial {
  if (!oceanMaterialInstance) {
    oceanMaterialInstance = new THREE.MeshStandardMaterial({
      color: new THREE.Color(WORLD.OCEAN_BASE_COLOR),
      emissive: new THREE.Color(WORLD.OCEAN_EMISSIVE_COLOR),
      emissiveIntensity: WORLD.OCEAN_EMISSIVE_INTENSITY,
      metalness: WORLD.OCEAN_METALNESS,
      roughness: WORLD.OCEAN_ROUGHNESS,
      transparent: true,
      opacity: WORLD.OCEAN_OPACITY,
      side: THREE.FrontSide,
    });
  }
  return oceanMaterialInstance;
}

export function disposeOceanMaterial(): void {
  oceanMaterialInstance?.dispose();
  oceanMaterialInstance = null;
}
