import { describe, expect, it } from 'vitest';
import { EvalError } from './EvalError.js';

describe(EvalError, () => {
  it('is an alias to globalThis.EvalError', () => {
    expect(EvalError).toBe(globalThis.EvalError);
  });
});
