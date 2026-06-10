// camera.types.ts
// Defines all camera-related types used across the world

export type CameraMode = 'cinematic' | 'exploration' | 'focus' | 'return';

export type CameraVector3 = {
  x: number;
  y: number;
  z: number;
};

export type CameraModeConfig = {
  position: CameraVector3;
  target: CameraVector3;
};

export type CameraState = {
  mode: CameraMode;
  isTransitioning: boolean;
  focusTargetId: string | null;
};
