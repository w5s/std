import { describe, it, expect } from 'vitest';
import { assertType } from '@w5s/core-type';
import { Error } from './Error.js';
import type { Result } from '../Result.js';

describe(Error, () => {
  it('should return a new object', () => {
    expect(Error('anyValue')).toEqual({ ok: false, error: 'anyValue' });
  });
  it('should return void result when value is omitted', () => {
    const result = Error();
    expect(result).toEqual({ ok: false, error: undefined });
    assertType<typeof result, Result<never, void>>(true);
  });
});
