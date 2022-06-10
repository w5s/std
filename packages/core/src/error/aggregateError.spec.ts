import { AggregateError } from './aggregateError';

describe(AggregateError, () => {
  test('should return instance of Error', () => {
    const errors = ['foo'];
    expect(AggregateError({ errors, message: 'my message' })).toEqual(
      expect.objectContaining({
        _type: 'DataError',
        name: 'AggregateError',
        message: 'my message',
        errors,
      })
    );
  });
});
