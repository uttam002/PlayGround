'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SHIP } from '@/constants/ship.constants';

// Placeholder geometry dimensions (used until real model is imported)
const PLACEHOLDER = {
  WIDTH: 3,
  HEIGHT: 2,
  DEPTH: 8,
  COLOR: '#3d2b1f', // dark wood
  MAST_RADIUS_TOP: 0.08,
  MAST_RADIUS_BOTTOM: 0.08,
  MAST_HEIGHT: 5,
  MAST_SEGMENTS: 8,
  MAST_COLOR: '#2a1a0e', // darker wood
} as const;

export function Ship() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.getElapsedTime();

    // Idle floating: gentle vertical bob
    groupRef.current.position.y =
      SHIP.POSITION.y + Math.sin(time * SHIP.FLOAT_SPEED) * SHIP.FLOAT_AMPLITUDE;

    // Idle rocking: subtle side tilt
    groupRef.current.rotation.z =
      Math.sin(time * SHIP.ROCK_SPEED) * SHIP.ROCK_AMPLITUDE;
  });

  return (
    <group
      ref={groupRef}
      position={[SHIP.POSITION.x, SHIP.POSITION.y, SHIP.POSITION.z]}
      scale={[SHIP.SCALE.x, SHIP.SCALE.y, SHIP.SCALE.z]}
    >
      {/* Phase 1 Placeholder — replace with <primitive object={model} /> when GLB is ready */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[PLACEHOLDER.WIDTH, PLACEHOLDER.HEIGHT, PLACEHOLDER.DEPTH]} />
        <meshStandardMaterial color={PLACEHOLDER.COLOR} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Ship mast placeholder */}
      <mesh
        position={[0, PLACEHOLDER.HEIGHT + PLACEHOLDER.MAST_HEIGHT / 2 - 1, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[
            PLACEHOLDER.MAST_RADIUS_TOP,
            PLACEHOLDER.MAST_RADIUS_BOTTOM,
            PLACEHOLDER.MAST_HEIGHT,
            PLACEHOLDER.MAST_SEGMENTS,
          ]}
        />
        <meshStandardMaterial color={PLACEHOLDER.MAST_COLOR} roughness={0.9} />
      </mesh>
    </group>
  );
}
