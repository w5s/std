import { describe, it, expect, vi } from 'vitest';
import { filter } from './filter.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(filter, () => {
  const expectIterable = withIterable(expect);
  it('should return a filtered iterator', () => {
    const source = of(1, 3, 2);
    expectIterable(filter(source, (value) => value >= 2)).toHaveValues([3, 2]);
  });
  it('should be idempotent', () => {
    const source = of(1, 3, 2);
    expectIterable(filter(source, (value) => value >= 2)).toBeIdemPotent();
  });
  it('calls callback with parameters', () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn(() => true);
    for (const _value of filter(source, callback)) {
      void _value;
    }
    expect(callback.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });
});
