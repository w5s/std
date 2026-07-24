import { Symbol } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { withIterable } from '../Testing.js';
import { create } from './create.js';

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
