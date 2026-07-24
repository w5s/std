import { describe, expect, it } from 'vitest';

import { Error } from './Error.js';
import { mapError } from './mapError.js';
import { Ok } from './Ok.js';

describe(mapError, () => {
  it('should return true for Ok() object', () => {
    expect(mapError(Ok('anyValue'), (error) => `${error}_suffix`)).toEqual(Ok('anyValue'));
  });
  it('should return false for Error() object', () => {
    expect(mapError(Error('anyError'), (error) => `${error}_suffix`)).toEqual(Error('anyError_suffix'));
  });
});
