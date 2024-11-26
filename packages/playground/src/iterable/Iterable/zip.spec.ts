import { describe, it, expect } from 'vitest';
import { zip } from './zip.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(zip, () => {
  const expectIterable = withIterable(expect);
  it('should return have size of left when size(left) < size(right)', () => {
    const source = of(1);

    expectIterable(zip(source, of('a', 'b', 'c'))).toHaveValues([[1, 'a']]);
  });
  it('should return have size of right when size(left) > size(right)', () => {
    const source = of(1, 2, 3);

    expectIterable(zip(source, of('a'))).toHaveValues([[1, 'a']]);
  });
  it('should return an iterable of tuples', () => {
    const source = of(1, 2, 3);

    expectIterable(zip(source, of('a', 'b', 'c'))).toHaveValues([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });
});
