import { describe, it, expect } from 'vitest';
import { map } from './map.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(map, () => {
  const expectIterable = withIterable(expect);
  it('should return a mapped iterator', () => {
    const source = of(1, 3, 2);
    expectIterable(map(source, (value) => value * 2)).toHaveValues([2, 6, 4]);
  });
});
