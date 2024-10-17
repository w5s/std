import { describe, it, expect } from 'vitest';
import { InvariantError } from './InvariantError.js';

describe('InvariantError', () => {
  it('should return instance of Error', () => {
    expect(InvariantError({ message: 'my message' })).toEqual(
      expect.objectContaining({
        name: 'InvariantError',
        message: 'my message',
      }),
    );
  });
});
