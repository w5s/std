import { describe, expect, it } from 'vitest';
import { RangeError } from './RangeError.js';

describe(RangeError, () => {
  it('is an alias to globalThis.RangeError', () => {
    expect(RangeError).toBe(globalThis.RangeError);
  });
});
