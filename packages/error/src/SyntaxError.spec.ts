import { describe, expect, it } from 'vitest';
import { SyntaxError } from './SyntaxError.js';

describe(SyntaxError, () => {
  it('is an alias to globalThis.SyntaxError', () => {
    expect(SyntaxError).toBe(globalThis.SyntaxError);
  });
});
