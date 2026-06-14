/**
 * Calculates wave height at a given world position and time
 * Uses combined sine waves to create organic, non-repeating wave patterns
 */
export function calculateWaveHeight(
  x: number,
  z: number,
  time: number,
  speed: number,
  height: number,
  frequency: number
): number {
  const primaryWave = Math.sin(x * frequency + time * speed) * height;
  const secondaryWave = Math.sin(z * frequency * 0.8 + time * speed * 1.2) * height * 0.5;
  const tertiaryWave = Math.sin((x + z) * frequency * 0.5 + time * speed * 0.7) * height * 0.3;
  return primaryWave + secondaryWave + tertiaryWave;
}
