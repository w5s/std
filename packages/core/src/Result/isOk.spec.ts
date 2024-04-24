import { describe, expect, it } from 'vitest';
import { isOk } from './isOk.js';
import { Ok } from './Ok.js';
import { Error } from './Error.js';

describe(isOk, () => {
  it('should return true for Ok() object', () => {
    expect(isOk(Ok('anyValue'))).toEqual(true);
  });
  it('should return false for Error() object', () => {
    expect(isOk(Error('anyValue'))).toEqual(false);
  });
});
