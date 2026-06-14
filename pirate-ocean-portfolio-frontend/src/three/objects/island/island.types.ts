// island.types.ts

import type { IslandDefinition } from '@/types/island.types';

export type IslandProps = {
  definition: IslandDefinition;
};

export type IslandBaseConfig = {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  segments: number;
};
