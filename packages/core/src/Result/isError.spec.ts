import { describe, expect, it } from 'vitest';
import { isError } from './isError.js';
import { Ok } from './Ok.js';
import { Error } from './Error.js';

describe(isError, () => {
  it('should return true for Result.Ok() object', () => {
    expect(isError(Ok('anyValue'))).toEqual(false);
  });
  it('should return false for Error() object', () => {
    expect(isError(Error('anyError'))).toEqual(true);
  });
});
