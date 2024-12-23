import { describe, expect, it } from 'vitest';
import { URIError } from './URIError.js';

describe(URIError, () => {
  it('is an alias to globalThis.URIError', () => {
    expect(URIError).toBe(globalThis.URIError);
  });
});
