import { describe, expect, it } from 'vitest';

import { empty } from './empty.js';

describe(empty, () => {
  it('returns the same instance', () => {
    const instance = empty();
    expect(instance).toEqual({});
    expect(empty()).toBe(instance);
  });
});
