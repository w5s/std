import { describe, expect, it } from 'vitest';
import * as Module from './index.js';
import { dispose } from './dispose.js';
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
