import { describe, expect, it } from 'vitest';
import { map } from './map.js';
import { Ok } from './Ok.js';
import { Error } from './Error.js';

describe(map, () => {
  it('should return true for Ok() object', () => {
    expect(map(Ok('anyValue'), (value) => `${value}_suffix`)).toEqual(Ok('anyValue_suffix'));
  });
  it('should return false for Error() object', () => {
    expect(map(Error('anyError'), (value) => `${value}_suffix`)).toEqual(Error('anyError'));
  });
});
