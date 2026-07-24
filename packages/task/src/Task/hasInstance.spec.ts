import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import type { TaskLike } from '../Task.js';

import { hasInstance } from './hasInstance.js';
import { resolve } from './resolve.js';

describe(hasInstance, () => {
  const anyValue = 'anyValue';
  it('returns false for any object', () => {
    expect(hasInstance(true)).toEqual(false);
    expect(hasInstance(null)).toEqual(false);
    expect(hasInstance(() => true)).toEqual(false);
  });
  it('returns true for Task object', () => {
    const unknownValue: unknown = resolve(anyValue);

    expect(hasInstance(unknownValue)).toEqual(true);
    if (hasInstance(unknownValue)) {
      assertType<typeof unknownValue, TaskLike<unknown, unknown>>(true);
    }
  });
});
