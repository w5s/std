import { describe, it, expect } from 'vitest';
import type { Awaitable } from '@w5s/core-type';
import { from } from './from.js';
import { withAsyncIterable } from '../Testing.js';
import { Iterable } from '../Iterable.js';

describe(from, () => {
  const expectIterable = withAsyncIterable(expect);

  it('returns values for an array of promise or values', async () => {
    const result = from([1, Promise.resolve(2), 3]);
    await expectIterable(result).toHaveValues([1, 2, 3]);
  });
  it('returns values for an iterable of promise or values', async () => {
    const result = from(Iterable.of<Awaitable<number>>(1, Promise.resolve(2), 3));
    await expectIterable(result).toHaveValues([1, 2, 3]);
  });
});
