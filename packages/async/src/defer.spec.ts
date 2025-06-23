// packages/async/src/__tests__/defer.test.ts
import { describe, it, expect } from 'vitest';
import { defer } from './defer.js';

describe(defer, () => {
  it('should properly resolve the promise with the given value', async () => {
    const { promise, resolve } = defer<string>();

    resolve('resolved value');

    // Here we should test the actual resolved value of the promise
    await expect(promise).resolves.toBe('resolved value');
  });

  it('should properly reject the promise with the given error', async () => {
    const { promise, reject } = defer<string>();

    reject(new Error('rejected error'));

    // Here we should test that the promise is rejected
    await expect(promise).rejects.toEqual(new Error('rejected error'));
  });
});
