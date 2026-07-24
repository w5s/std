import { describe, expect, it } from 'vitest';

import { Error } from './Error.js';
import { hasInstance } from './hasInstance.js';
import { Ok } from './Ok.js';

describe(hasInstance, () => {
  const anyValue = 'anyValue';
  it('should return true for Ok() or Error() object', () => {
    expect(hasInstance(Ok(anyValue))).toEqual(true);
    expect(hasInstance(Error(anyValue))).toEqual(true);
  });
  it('should return false for any other value', () => {
    expect(hasInstance(undefined)).toEqual(false);
    expect(hasInstance({ _: 'anyType' })).toEqual(false);
  });
});
