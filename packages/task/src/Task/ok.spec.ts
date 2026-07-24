import { Result } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { ok } from './ok.js';

describe(ok, () => {
  it('should be ok', () => {
    expect(ok).toBe(Result.Ok);
  });
});
