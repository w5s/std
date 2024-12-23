import { describe, expect, it } from 'vitest';
import { ReferenceError } from './ReferenceError.js';

describe(ReferenceError, () => {
  it('is an alias to globalThis.ReferenceError', () => {
    expect(ReferenceError).toBe(globalThis.ReferenceError);
  });
});
