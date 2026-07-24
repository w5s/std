import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import { ignore } from './ignore.js';

describe('ignore', () => {
  it.each([1, undefined, {}])('should return undefined', (value) => {
    const returnValue = ignore(value);
    expect(returnValue).toBe(undefined);
    assertType<typeof returnValue, void>(true);
  });
});
