import { describe, it, expect, vi } from 'vitest';
import { map } from './map.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(map, () => {
  const expectIterable = withIterable(expect);
  it('should return a mapped iterator', () => {
    const source = of(1, 3, 2);
    expectIterable(map(source, (value) => value * 2)).toHaveValues([2, 6, 4]);
  });
  it('should be idempotent', () => {
    const source = of(1, 3, 2);
    expectIterable(map(source, (value) => value * 2)).toBeIdemPotent();
  });
  it('calls callback with parameters', () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn((_) => _);
    Array.from(map(source, callback)); // Force evaluations
    expect(callback.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });
});
