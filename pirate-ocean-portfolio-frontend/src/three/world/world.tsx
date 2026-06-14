import { WorldEnvironment } from '@/three/environment/world-environment';
import { Ocean } from '@/three/objects/ocean';
import { WorldCamera } from '@/three/cameras';
import { Ship } from '@/three/objects/ship';
import { WorldIslands } from './world-islands';

export function World() {
  return (
    <>
      {/* Camera System */}
      <WorldCamera />

      {/* Environment: Lighting, Fog, Atmosphere */}
      <WorldEnvironment />

      {/* Ocean plane with wave animations */}
      <Ocean />

      {/* Ship floating at (0, 0, 0) */}
      <Ship />

      {/* All data-driven islands */}
      <WorldIslands />

      {/* Future: <NavigationRoutes /> */}
    </>
  );
}
