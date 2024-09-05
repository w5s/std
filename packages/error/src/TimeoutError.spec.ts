import { describe, it, expect } from 'vitest';
import { TimeoutError } from './TimeoutError.js';

describe('TimeoutError', () => {
  it('should return instance of Error', () => {
    expect(TimeoutError({ message: 'my message' })).toEqual(
      expect.objectContaining({
        name: 'TimeoutError',
        message: 'my message',
      })
    );
  });
});
