import { describe, expect, it } from 'vitest';
import { Headers } from './Headers.js';

describe(Headers, () => {
  it('should return immutable copy of headers', () => {
    const init = {
      foo: 'bar',
    };
    expect(Headers(init)).toEqual({
      foo: 'bar',
    });
    expect(Headers(init)).not.toBe(init);
  });
  it('should work with iterable of tuple', () => {
    const init = [['foo', 'bar'] as const];
    expect(Headers(init)).toEqual({
      foo: 'bar',
    });
    expect(Headers(init)).not.toBe(init);
  });
});
