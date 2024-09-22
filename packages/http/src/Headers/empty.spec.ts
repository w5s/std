import { describe, it, expect } from 'vitest';
import { empty } from './empty.js';

describe(empty, () => {
  it('returns the same instance', () => {
    const instance = empty();
    expect(instance).toEqual({});
    expect(empty()).toBe(instance);
  });
});
