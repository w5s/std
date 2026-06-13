import { Result } from '@w5s/core/Result';
import { describe, expect, it } from 'vitest';

import { error } from './error.js';

describe(error, () => {
  it('should be error', () => {
    expect(error).toBe(Result.Error);
  });
});
