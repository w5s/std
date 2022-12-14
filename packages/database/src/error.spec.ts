import { describe, it, expect } from '@jest/globals';
import { DatabaseError } from './error.js';

describe(DatabaseError, () => {
  it('should construct DatabaseError', () => {
    const cause = new Error('MockError');

    expect(DatabaseError({ message: 'Message', cause })).toEqual(
      expect.objectContaining({
        name: 'DatabaseError',
        message: 'Message',
        cause,
      })
    );
  });
});
