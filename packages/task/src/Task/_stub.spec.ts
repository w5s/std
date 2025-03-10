import { test, expect } from 'vitest';

export const allSyncCombination = [
  ['sync', 'sync'],
  ['async', 'sync'],
  ['sync', 'async'],
  ['async', 'async'],
] as Array<['sync' | 'async', 'sync' | 'async']>;

test('allSyncCombination', () => expect(typeof allSyncCombination).toBe('object'));
