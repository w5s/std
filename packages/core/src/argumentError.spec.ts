import { describe, it, expect } from '@jest/globals';
import { ArgumentError } from './argumentError.js';

describe(ArgumentError, () => {
  it('should return instance of Error', () => {
    expect(ArgumentError({ message: 'my message' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'ArgumentError',
        message: 'my message',
      })
    );
  });
});
