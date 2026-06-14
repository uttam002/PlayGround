import { WorldEnvironment } from '@/three/environment/world-environment';

export function World() {
  return (
    <>
      {/* Environment: Lighting, Fog, Atmosphere */}
      <WorldEnvironment />

      {/* Future: <WorldOcean /> */}
      {/* Future: <WorldShip /> */}
      {/* Future: <WorldIslands /> */}
      {/* Future: <NavigationRoutes /> */}
    </>
  );
}
