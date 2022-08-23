import { describe, test, expect } from '@jest/globals';
import { ArgumentError } from './argumentError.js';

describe(ArgumentError, () => {
  test('should return instance of Error', () => {
    expect(ArgumentError({ message: 'my message' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'ArgumentError',
        message: 'my message',
      })
    );
  });
});
