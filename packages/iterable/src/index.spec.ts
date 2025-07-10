import { describe, expect, it } from 'vitest';
import * as Module from './index.js';

describe('module public API', () => {
  it('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        Iterable: expect.any(Object),
        AsyncIterable: expect.any(Object),
      }),
    );
  });
});
