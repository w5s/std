import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { reduce } from './reduce.js';

describe(reduce, () => {
  it('should return reduce for each value using initialValue', () => {
    const source = of(1, 3, 2);

    expect(reduce(source, (acc, value) => acc + String(value), '')).toEqual('132');
  });
});
