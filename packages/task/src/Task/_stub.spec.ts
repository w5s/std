import { describe, expect, it } from 'vitest';

export const allSyncCombination = [
  ['sync', 'sync'],
  ['async', 'sync'],
  ['sync', 'async'],
  ['async', 'async'],
] as Array<['sync' | 'async', 'sync' | 'async']>;

describe('allSyncCombination', () => {
  it('exports combinations', () => {
    expect(typeof allSyncCombination).toBe('object');
  });
});
