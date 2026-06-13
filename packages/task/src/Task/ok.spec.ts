import { describe, it, expect } from 'vitest';
import { Result } from '@w5s/core/Result';
import { ok } from './ok.js';

describe(ok, () => {
  it('should be ok', () => {
    expect(ok).toBe(Result.Ok);
  });
});
