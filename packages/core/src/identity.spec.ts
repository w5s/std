import { describe, expect, it } from 'vitest';

import { identity } from './identity.js';

describe('identity', () => {
  it.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(identity(value)).toBe(value);
  });
});
