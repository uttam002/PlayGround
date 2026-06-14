// island.tsx
import { IslandBase } from './island-base';
import { PalmTree } from '@/three/objects/environment-props/palm-tree';
import { ISLAND_GEOMETRY } from '@/constants/island.constants';
import type { IslandProps } from './island.types';

export function Island({ definition }: IslandProps) {
  const { position } = definition;

  return (
    <group
      position={[position.x, position.y + ISLAND_GEOMETRY.POSITION_Y, position.z]}
      name={`island-${definition.id}`}
    >
      {/* Island terrain base */}
      <IslandBase />

      {/* Palm trees — same for all island types in Phase 1 */}
      {ISLAND_GEOMETRY.TREE_POSITIONS.map((treePos, index) => (
        <PalmTree
          key={`${definition.id}-tree-${index}`}
          position={treePos}
          rotation={(index * Math.PI) / 3}
        />
      ))}
    </group>
  );
}
