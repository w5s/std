import { describe, expect, it } from 'vitest';

import * as Module from './index.js';

describe('module public API', () => {
  it('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        AsyncIterable: expect.any(Object),
        Iterable: expect.any(Object),
      }),
    );
  });
});
