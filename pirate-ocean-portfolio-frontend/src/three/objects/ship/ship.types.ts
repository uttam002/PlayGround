// ship.types.ts

export type ShipPosition = {
  x: number;
  y: number;
  z: number;
};

export type ShipState = 'docked' | 'sailing' | 'idle';
