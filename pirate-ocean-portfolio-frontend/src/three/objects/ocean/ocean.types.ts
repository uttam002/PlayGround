export type OceanWaveConfig = {
  speed: number;
  height: number;
  frequency: number;
};

export type OceanConfig = {
  size: number;
  segments: number;
  positionY: number;
  wave: OceanWaveConfig;
};
