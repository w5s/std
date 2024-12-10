import { describe, expect, it } from 'vitest';
import * as Module from './index.js';
import { abortable } from './abortable.js';
import { abort } from './abort.js';

describe('module public API', () => {
  it('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        abortable,
        abort,
      }),
    );
  });
});
