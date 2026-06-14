// palm-tree.tsx
import * as THREE from 'three';

const TRUNK_COLOR = '#5c3d1e' as const;
const LEAF_COLOR = '#2d7a2a' as const;
const TRUNK_HEIGHT = 3.5 as const;
const TRUNK_RADIUS = 0.15 as const;
const LEAF_RADIUS = 1.8 as const;

type PalmTreeProps = {
  position: [number, number, number];
  rotation?: number; // Y-axis rotation in radians
};

export function PalmTree({ position, rotation = 0 }: PalmTreeProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Trunk */}
      <mesh
        position={[0, TRUNK_HEIGHT / 2, 0]}
        rotation={[0, 0, 0.15]} // Slight lean
        castShadow
      >
        <cylinderGeometry args={[TRUNK_RADIUS * 0.7, TRUNK_RADIUS, TRUNK_HEIGHT, 6]} />
        <meshStandardMaterial color={TRUNK_COLOR} roughness={0.9} />
      </mesh>

      {/* Leaf cluster */}
      <mesh position={[0, TRUNK_HEIGHT + 0.5, 0]} castShadow>
        <coneGeometry args={[LEAF_RADIUS, 2, 8]} />
        <meshStandardMaterial color={LEAF_COLOR} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
