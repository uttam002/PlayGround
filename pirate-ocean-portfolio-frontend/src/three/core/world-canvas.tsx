'use client';

import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { Suspense } from 'react';
import { World } from '@/three/world/world';
import { CAMERA } from '@/constants/camera.constants';
import { AppConfig } from '@/config/app.config';

export function WorldCanvas() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov: CAMERA.FOV,
          near: CAMERA.NEAR_PLANE,
          far: CAMERA.FAR_PLANE,
          position: [
            CAMERA.CINEMATIC.POSITION.x,
            CAMERA.CINEMATIC.POSITION.y,
            CAMERA.CINEMATIC.POSITION.z,
          ],
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <World />
        </Suspense>
        {AppConfig.isDevelopment && <Stats />}
      </Canvas>
    </div>
  );
}
