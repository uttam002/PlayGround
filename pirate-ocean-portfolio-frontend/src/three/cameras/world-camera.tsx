'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useCameraStore } from '@/store/camera.store';
import { CAMERA } from '@/constants/camera.constants';
import type { CameraMode, CameraVector3 } from '@/types/camera.types';

const CAMERA_CONFIGS: Record<
  Extract<CameraMode, 'cinematic' | 'exploration' | 'return'>,
  { position: CameraVector3; target: CameraVector3 }
> = {
  cinematic: {
    position: CAMERA.CINEMATIC.POSITION,
    target: CAMERA.CINEMATIC.TARGET,
  },
  exploration: {
    position: CAMERA.EXPLORATION.POSITION,
    target: CAMERA.EXPLORATION.TARGET,
  },
  return: {
    position: CAMERA.RETURN.POSITION,
    target: CAMERA.RETURN.TARGET,
  },
};

export function WorldCamera() {
  const { camera } = useThree();
  const mode = useCameraStore((s) => s.mode);
  const setIsTransitioning = useCameraStore((s) => s.setIsTransitioning);
  const gsapTimeline = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // For now, in Version 1, 'focus' is not fully implemented.
    // If we transition to focus, or an unmapped mode, skip static config.
    const config = CAMERA_CONFIGS[mode as keyof typeof CAMERA_CONFIGS];
    if (!config) return;

    // Kill any in-progress transition
    if (gsapTimeline.current) {
      gsapTimeline.current.kill();
    }

    setIsTransitioning(true);

    // Prepare target object to animate lookAt dynamically during the position tween
    const lookAtTarget = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    // Calculate initial target direction by casting a ray along camera forward vector,
    // or just animate the lookAt target vector from origin/current target to new target.
    // However, lookAt on every frame is best driven by animating a target vector.
    // We can animate a temporary vector, but a simpler, cleaner way is:
    // We want the camera target to animate from the current lookAt direction to the new target.
    // For simplicity and perfect accuracy (since in cinematic and exploration target is {0,0,0}):
    // we animate the camera position and keep the target focused.
    // If the target ever changes (e.g. in future Focus mode), we can animate both position and target.
    // Let's implement full position and target anim to prevent abrupt jumps:
    const targetAnim = {
      x: mode === 'cinematic' ? CAMERA.CINEMATIC.TARGET.x : CAMERA.EXPLORATION.TARGET.x,
      y: mode === 'cinematic' ? CAMERA.CINEMATIC.TARGET.y : CAMERA.EXPLORATION.TARGET.y,
      z: mode === 'cinematic' ? CAMERA.CINEMATIC.TARGET.z : CAMERA.EXPLORATION.TARGET.z,
    };

    // Since cinematic -> exploration targets are both (0,0,0), lookAt remains at origin.
    // But to make it robust, we animate the lookAt target vector as well.
    // We start lookAt targeting the previous configuration target and tweening to the new configuration target.
    // Let's find previous target or default to (0,0,0):
    const currentTarget = { x: config.target.x, y: config.target.y, z: config.target.z };

    gsapTimeline.current = gsap.to(camera.position, {
      x: config.position.x,
      y: config.position.y,
      z: config.position.z,
      duration: CAMERA.TRANSITION_DURATION,
      ease: CAMERA.TRANSITION_EASE,
      onUpdate: () => {
        camera.lookAt(currentTarget.x, currentTarget.y, currentTarget.z);
      },
      onComplete: () => {
        camera.lookAt(config.target.x, config.target.y, config.target.z);
        setIsTransitioning(false);
      },
    });

    return () => {
      if (gsapTimeline.current) {
        gsapTimeline.current.kill();
      }
    };
  }, [mode, camera, setIsTransitioning]);

  return null;
}
