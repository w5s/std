import { describe, it, expect } from 'vitest';
import { Error } from './Error.js';
import { assertType } from '../testing.js';
import type { Result } from '../Result.js';

describe(Error, () => {
  it('should return a new object', () => {
    expect(Error('anyValue')).toEqual({ _: 'Error', ok: false, error: 'anyValue' });
  });
  it('should return void result when value is omitted', () => {
    const result = Error();
    expect(result).toEqual({ _: 'Error', ok: false, error: undefined });
    assertType<typeof result, Result<never, void>>(true);
  });
});
