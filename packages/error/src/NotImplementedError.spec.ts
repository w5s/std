import { describe, it, expect } from 'vitest';
import { NotImplementedError } from './NotImplementedError.js';

describe(NotImplementedError, () => {
  it('should return instance of Error', () => {
    expect(NotImplementedError()).toEqual(
      expect.objectContaining({
        name: 'NotImplementedError',
        message: 'Not implemented',
      }),
    );
    expect(NotImplementedError({ message: 'my message' })).toEqual(
      expect.objectContaining({
        name: 'NotImplementedError',
        message: 'my message',
      }),
    );
  });
});
