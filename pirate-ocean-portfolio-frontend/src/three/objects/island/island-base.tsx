// island-base.tsx
import { ISLAND_GEOMETRY } from '@/constants/island.constants';

export function IslandBase() {
  return (
    <group>
      {/* Sandy top */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry
          args={[
            ISLAND_GEOMETRY.BASE_RADIUS_TOP,
            ISLAND_GEOMETRY.BASE_RADIUS_BOTTOM,
            ISLAND_GEOMETRY.BASE_HEIGHT,
            ISLAND_GEOMETRY.BASE_SEGMENTS,
          ]}
        />
        <meshStandardMaterial color={ISLAND_GEOMETRY.SAND_COLOR} roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Submerged rock base */}
      <mesh receiveShadow position={[0, -ISLAND_GEOMETRY.BASE_HEIGHT * 0.6, 0]}>
        <cylinderGeometry
          args={[
            ISLAND_GEOMETRY.BASE_RADIUS_BOTTOM * 0.95,
            ISLAND_GEOMETRY.BASE_RADIUS_BOTTOM * 1.1,
            ISLAND_GEOMETRY.BASE_HEIGHT,
            ISLAND_GEOMETRY.BASE_SEGMENTS,
          ]}
        />
        <meshStandardMaterial color={ISLAND_GEOMETRY.ROCK_COLOR} roughness={1.0} metalness={0.0} />
      </mesh>
    </group>
  );
}
