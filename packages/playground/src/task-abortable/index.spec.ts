import { describe, expect, it } from 'vitest';

import { abort } from './abort.js';
import { abortable } from './abortable.js';
import * as Module from './index.js';

describe('module public API', () => {
  it('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        abort,
        abortable,
      }),
    );
  });
});
