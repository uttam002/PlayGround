import { WorldEnvironment } from '@/three/environment/world-environment';
import { Ocean } from '@/three/objects/ocean';

export function World() {
  return (
    <>
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
