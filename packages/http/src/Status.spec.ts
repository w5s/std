import { describe, expect, it } from 'vitest';
import { Status } from './Status.js';
import { StatusBounded } from './Status/StatusBounded.js';
import { StatusComparable } from './Status/StatusComparable.js';

describe('Status', () => {
  it('is an alias to functions', () => {
    expect(Status).toEqual(expect.objectContaining(StatusBounded));
    expect(Status).toEqual(expect.objectContaining(StatusComparable));
  });
  it('is a constructor', () => {
    expect(Status).toEqual(
      expect.objectContaining({
        hasInstance: expect.any(Function),
        codecSchema: expect.any(Function),
        codecEncode: expect.any(Function),
        codecDecode: expect.any(Function),
      }),
    );
  });
  it('has all status', () => {
    expect(Status).toEqual(
      expect.objectContaining({
        Accepted: {
          statusCode: 202,
          statusMessage: 'Accepted',
        },
      }),
    );
  });
});
