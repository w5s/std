import { describe, it, expect } from 'vitest';
import { fromAsync } from './fromAsync.js';

describe(fromAsync, () => {
  it('should handle an iterable as input', async () => {
    const iterable = new Set([1, 2, 3]);
    const result = await fromAsync(iterable);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should process async iterable inputs', async () => {
    async function* asyncGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }

    const result = await fromAsync(asyncGenerator());
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle promises in the input iterable', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    const result = await fromAsync(promises);
    expect(result).toEqual([1, 2, 3]);
  });

  it.skip('should process items sequentially by default', async () => {
    const order: number[] = [];
    const array = [1, 2, 3];

    await fromAsync(array, async (x) => {
      order.push(x);
      // Create varying delays to ensure we're testing actual sequential behavior
      await new Promise((resolve) => {
        setTimeout(resolve, (4 - x) * 10);
      });
      return x;
    });

    expect(order).toEqual([1, 2, 3]);
  });

  it('should pass the index as the second parameter to the mapping function', async () => {
    const array = ['a', 'b', 'c'];
    const indexes: number[] = [];

    await fromAsync(array, async (_, index) => {
      indexes.push(index);
      return index;
    });

    expect(indexes).toEqual([0, 1, 2]);
  });

  it('should reject if the mapping function throws an error', async () => {
    const array = [1, 2, 3];
    const error = new Error('Test error');

    await expect(
      fromAsync(array, async (x) => {
        if (x === 2) throw error;
        return x;
      }),
    ).rejects.toEqual(error);
  });

  it('should work with no mapping function provided', async () => {
    const array = [1, 2, 3];
    const result = await fromAsync(array);
    expect(result).toEqual([1, 2, 3]);
  });
});
