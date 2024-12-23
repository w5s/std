import { describe, expect, it } from 'vitest';
import { Error } from './Error.js';

describe(Error, () => {
  it('is an alias to globalThis.Error', () => {
    expect(Error).toBe(globalThis.Error);
  });
});
