import { describe, expect, it } from 'vitest';
import { generate } from './generate.js';

describe(generate, () => {
  it('should return an empty iterable when 0', () => {
    expect(generate(0, () => 'a')).toEqual([]);
  });
  it('should use mapFn(index) to generate values', () => {
    expect(generate(3, (_) => _)).toEqual([0, 1, 2]);
  });
});
