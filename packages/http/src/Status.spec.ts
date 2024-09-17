import { describe, expect, it } from 'vitest';
import { Status } from './Status.js';

describe('Status', () => {
  it('is a constructor', () => {
    expect(Status).toEqual(
      expect.objectContaining({
        hasInstance: expect.any(Function),
        codecSchema: expect.any(Function),
        codecEncode: expect.any(Function),
        codecDecode: expect.any(Function),
      })
    );
  });
  it('has all status', () => {
    expect(Status).toEqual(
      expect.objectContaining({
        Accepted: {
          statusCode: 202,
          statusMessage: 'Accepted',
        },
      })
    );
  });
});
