import { describe, expect, it } from 'vitest';

import { dispose } from './dispose.js';
import * as Module from './index.js';
import { using } from './using.js';

describe('module public API', () => {
  it('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        dispose,
        using,
      }),
    );
  });
});
