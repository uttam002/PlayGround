import { WorldEnvironment } from '@/three/environment/world-environment';
import { Ocean } from '@/three/objects/ocean';
import { WorldCamera } from '@/three/cameras';

export function World() {
  return (
    <>
      {/* Camera System */}
      <WorldCamera />

      {/* Environment: Lighting, Fog, Atmosphere */}
      <WorldEnvironment />

      {/* Ocean plane with wave animations */}
      <Ocean />

      {/* Future: <WorldShip /> */}
      {/* Future: <WorldIslands /> */}
      {/* Future: <NavigationRoutes /> */}
    </>
  );
}
