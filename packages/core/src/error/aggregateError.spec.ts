import { describe, test, expect } from '@jest/globals';
import { AggregateError } from './aggregateError.js';

describe(AggregateError, () => {
  test('should return instance of Error', () => {
    const errors = ['foo'];
    expect(AggregateError({ errors, message: 'my message' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'AggregateError',
        message: 'my message',
        errors,
      })
    );
  });
});
