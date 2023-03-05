import { describe, it, expect } from '@jest/globals';
import { AggregateError } from './aggregateError.js';

describe('AggregateError', () => {
  it('should return instance of Error', () => {
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
