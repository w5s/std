import { describe, expect, it } from 'vitest';
import { Status } from './Status.js';
import { StatusBounded } from './Status/StatusBounded.js';
import { StatusComparable } from './Status/StatusComparable.js';
import { StatusIndexable } from './Status/StatusIndexable.js';

describe('Status', () => {
  it('is an alias to functions', () => {
    expect(Status).toEqual(expect.objectContaining(StatusBounded));
    expect(Status).toEqual(expect.objectContaining(StatusComparable));
    expect(Status).toEqual(expect.objectContaining(StatusIndexable));
  });
  it('is a constructor', () => {
    expect(Status).toEqual(
      expect.objectContaining({
        hasInstance: expect.any(Function),
        __schema__: expect.any(Function),
        __encode__: expect.any(Function),
        __decode__: expect.any(Function),
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
