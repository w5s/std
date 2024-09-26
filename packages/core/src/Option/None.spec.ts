import { describe, expect, it } from 'vitest';
import { None } from './None.js';
import { isNone } from './isNone.js';

describe('None', () => {
  it('should be an alias for undefined', () => {
    expect(None).toBe(undefined);
  });
  it('should be compatible with JSON.stringify/parse', () => {
    const data = structuredClone({ foo: None });
    expect(data).toEqual({ foo: None });
    expect(isNone(data.foo)).toBe(true);
  });
});
