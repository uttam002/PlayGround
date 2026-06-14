'use client';

import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WORLD } from '@/constants/world.constants';

const MOONLIGHT_COLOR = '#c8d8e8' as const;
const MOONLIGHT_INTENSITY = 0.8 as const;
const AMBIENT_COLOR = '#0d1b2a' as const;
const AMBIENT_INTENSITY = 0.3 as const;
const SKY_COLOR = '#0a0f1e' as const;
const GROUND_COLOR = '#050508' as const;
const HEMISPHERE_INTENSITY = 0.5 as const;

const MOONLIGHT_POSITION: [number, number, number] = [50, 80, 30];

export function WorldEnvironment() {
  const { scene } = useThree();
  const moonlightRef = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    scene.background = new THREE.Color(WORLD.BACKGROUND_COLOR);
    scene.fog = new THREE.FogExp2(WORLD.FOG_COLOR, WORLD.FOG_DENSITY);

    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <ambientLight color={AMBIENT_COLOR} intensity={AMBIENT_INTENSITY} />
      <hemisphereLight
        color={SKY_COLOR}
        groundColor={GROUND_COLOR}
        intensity={HEMISPHERE_INTENSITY}
      />
      <directionalLight
        ref={moonlightRef}
        color={MOONLIGHT_COLOR}
        intensity={MOONLIGHT_INTENSITY}
        position={MOONLIGHT_POSITION}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
    </>
  );
}
