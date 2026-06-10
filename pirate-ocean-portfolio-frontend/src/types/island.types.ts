// island.types.ts
// Defines what an Island IS in the world
// Every island in the 3D world is described by IslandDefinition

export type IslandType =
  | 'home'
  | 'skills'
  | 'experience'
  | 'achievement'
  | 'harbor'
  | 'project';

export type IslandPosition = {
  x: number;
  y: number;
  z: number;
};

export type IslandDefinition = {
  id: string;
  type: IslandType;
  label: string;
  position: IslandPosition;
  isUnlocked: boolean;
};
