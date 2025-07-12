import { describe, expect, it } from 'vitest';
import { assertType } from '@w5s/core-type';
import { getOrThrow } from './getOrThrow.js';
import { Error } from './Error.js';
import { Ok } from './Ok.js';

describe('.getOrThrow', () => {
  const anyValue = 'anyValue' as const;
  const anyError = 'anyError';
  it('should return undefined for Error', () => {
    expect(() => {
      getOrThrow(Error(anyError));
    }).toThrow(anyError);
  });
  it('should return value for Ok', () => {
    const returnValue = getOrThrow(Ok(anyValue));
    expect(returnValue).toBe(anyValue);
    assertType<typeof returnValue, typeof anyValue>(true);
  });
});
