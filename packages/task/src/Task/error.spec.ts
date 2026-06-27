import { describe, it, expect } from 'vitest';
import { Result } from '@w5s/core/Result';
import { error } from './error.js';

describe(error, () => {
  it('should be error', () => {
    expect(error).toBe(Result.Error);
  });
});
