// world-islands.tsx
import { Island } from '@/three/objects/island';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';

export function WorldIslands() {
  return (
    <group name="world-islands">
      {ISLAND_DEFINITIONS.map((definition) => (
        <Island key={definition.id} definition={definition} />
      ))}
    </group>
  );
}
