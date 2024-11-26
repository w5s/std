import { describe, it, expect } from 'vitest';
import { zip } from './zip.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(zip, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should return have size of left when size(left) < size(right)', async () => {
    const source = of(1);

    await expectAsyncIterable(zip(source, of('a', 'b', 'c'))).toHaveValues([[1, 'a']]);
  });
  it('should return have size of right when size(left) > size(right)', async () => {
    const source = of(1, 2, 3);

    await expectAsyncIterable(zip(source, of('a'))).toHaveValues([[1, 'a']]);
  });
  it('should return an iterable of tuples', async () => {
    const source = of(1, 2, 3);

    await expectAsyncIterable(zip(source, of('a', 'b', 'c'))).toHaveValues([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });
});
