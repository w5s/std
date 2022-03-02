import { DatabaseClientError } from './error.js';

describe(DatabaseClientError, () => {
  test('should construct DatabaseClientError', () => {
    const cause = new Error('MockError');

    expect(DatabaseClientError({ message: 'Message', cause })).toEqual(
      expect.objectContaining({
        name: 'DatabaseClientError',
        message: 'Message: MockError',
        cause,
      })
    );
  });
});
