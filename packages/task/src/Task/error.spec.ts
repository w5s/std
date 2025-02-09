import { describe, it, expect } from 'vitest';
import { Result } from '@w5s/core';
import { error } from './error.js';

describe(error, () => {
  it('should be error', () => {
    expect(error).toBe(Result.Error);
  });
});
