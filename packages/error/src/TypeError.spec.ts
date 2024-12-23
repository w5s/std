import { describe, expect, it } from 'vitest';
import { TypeError } from './TypeError.js';

describe(TypeError, () => {
  it('is an alias to globalThis.TypeError', () => {
    expect(TypeError).toBe(globalThis.TypeError);
  });
});
