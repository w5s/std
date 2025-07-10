import { describe, it, expect } from 'vitest';
import { Symbol } from '@w5s/core';
import { create } from './create.js';
import { withAsyncIterable } from '../Testing.js';

describe(create, () => {
  const expectAsyncIterable = withAsyncIterable(expect);

  it('should return a new Iterable from function', () => {
    const fn = () => ({ next: async () => ({ done: true, value: undefined }) });
    expect(create(fn)).toEqual({ [Symbol.asyncIterator]: fn });
  });
  it('should be idempotent', async () => {
    const source = create(async function* iterator() {
      for (let i = 0; i < 10; i += 1) {
        yield i;
      }
    });
    await expectAsyncIterable(source).toBeIdemPotent();
  });
});
