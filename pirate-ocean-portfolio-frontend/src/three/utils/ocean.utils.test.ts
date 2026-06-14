import { describe, it, expect } from 'vitest';
import { calculateWaveHeight } from './ocean.utils';

describe('calculateWaveHeight', () => {
  it('returns a number', () => {
    const height = calculateWaveHeight(0, 0, 0, 0.5, 0.3, 0.08);
    expect(typeof height).toBe('number');
  });

  it('returns 0 at time=0 and position=0', () => {
    // At x=0, z=0, time=0, all sine terms are 0
    const height = calculateWaveHeight(0, 0, 0, 0.5, 0.3, 0.08);
    expect(height).toBeCloseTo(0, 5);
  });

  it('does not exceed max wave height multiplied by total wave amplitude', () => {
    const maxHeight = 0.3;
    const height = calculateWaveHeight(100, 100, 100, 0.5, maxHeight, 0.08);
    // Combined waves (1 + 0.5 + 0.3 = 1.8 amplitude factor) max out at 1.8 * maxHeight
    expect(Math.abs(height)).toBeLessThan(maxHeight * 2);
  });
});
