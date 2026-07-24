import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import type { Result } from '../Result.js';

import { Error } from './Error.js';

describe(Error, () => {
  it('should return a new object', () => {
    expect(Error('anyValue')).toEqual({ error: 'anyValue', ok: false });
  });
  it('should return void result when value is omitted', () => {
    const result = Error();
    expect(result).toEqual({ error: undefined, ok: false });
    assertType<typeof result, Result<never, void>>(true);
  });
});
