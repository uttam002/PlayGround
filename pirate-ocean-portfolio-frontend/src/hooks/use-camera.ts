'use client';

import { useCallback } from 'react';
import { useCameraStore } from '@/store/camera.store';
import type { CameraMode } from '@/types/camera.types';

export function useCamera() {
  const mode = useCameraStore((s) => s.mode);
  const isTransitioning = useCameraStore((s) => s.isTransitioning);
  const setCameraMode = useCameraStore((s) => s.setCameraMode);
  const setIsTransitioning = useCameraStore((s) => s.setIsTransitioning);

  const transitionTo = useCallback(
    (newMode: CameraMode) => {
      if (isTransitioning || newMode === mode) return;

      setIsTransitioning(true);
      setCameraMode(newMode);
    },
    [mode, isTransitioning, setCameraMode, setIsTransitioning]
  );

  const enterExploration = useCallback(() => {
    transitionTo('exploration');
  }, [transitionTo]);

  const enterCinematic = useCallback(() => {
    transitionTo('cinematic');
  }, [transitionTo]);

  const returnToWorld = useCallback(() => {
    transitionTo('return');
  }, [transitionTo]);

  return {
    mode,
    isTransitioning,
    transitionTo,
    enterExploration,
    enterCinematic,
    returnToWorld,
  };
}
