import { describe, it, expect } from 'vitest';
import { Symbol } from '@w5s/core';
import { create } from './create.js';
import { withIterable } from '../Testing.js';

describe(create, () => {
  const expectIterable = withIterable(expect);

  it('should return a new Iterable from function', () => {
    const fn = () => ({ next: () => ({ done: true, value: undefined }) });
    expect(create(fn)).toEqual({ [Symbol.iterator]: fn });
  });
  it('should be idempotent', () => {
    const source = create(() => [1, 2, 3][Symbol.iterator]());
    expectIterable(source).toBeIdemPotent();
  });
});
