import { describe, expect, it } from 'vitest';
import { assertType } from '../Testing.js';
import { getOrElse } from './getOrElse.js';
import { Error } from './Error.js';
import { Result } from '../Result.js';
import { Ok } from './Ok.js';

describe(getOrElse, () => {
  const anyValue = 'anyValue';
  const anyError = 'anyError';
  it('should return defaultValue for Error', () => {
    const returnValue = getOrElse(Error(anyError) as Result<typeof anyValue, typeof anyError>, () => 1);
    expect(returnValue).toEqual(1);
    assertType<typeof returnValue, typeof anyValue | number>(true);
  });
  it('should return value for Ok', () => {
    expect(getOrElse(Ok(anyValue), () => 1)).toBe(anyValue);
  });
});
