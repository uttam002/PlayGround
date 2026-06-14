'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getOceanMaterial, disposeOceanMaterial } from '@/three/materials/ocean.material';
import { calculateWaveHeight } from '@/three/utils/ocean.utils';
import { WORLD } from '@/constants/world.constants';

export function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create geometry ONCE — never recreate in render
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      WORLD.OCEAN_SIZE,
      WORLD.OCEAN_SIZE,
      WORLD.OCEAN_SEGMENTS,
      WORLD.OCEAN_SEGMENTS
    );
    geo.rotateX(-Math.PI / 2); // Rotate flat — planes are vertical by default
    return geo;
  }, []);

  // Dispose resources on unmount to prevent leaks
  useEffect(() => {
    return () => {
      disposeOceanMaterial();
      geometry.dispose();
    };
  }, [geometry]);

  // Animate wave vertices each frame
  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const waveY = calculateWaveHeight(
        x,
        z,
        time,
        WORLD.OCEAN_WAVE_SPEED,
        WORLD.OCEAN_WAVE_HEIGHT,
        WORLD.OCEAN_WAVE_FREQUENCY
      );
      positions.setY(i, waveY);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals(); // Recalculate normals for correct lighting reflection
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={getOceanMaterial()}
      position={[0, WORLD.OCEAN_POSITION_Y, 0]}
      receiveShadow
    />
  );
}
