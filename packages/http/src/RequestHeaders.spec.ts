import { describe, expect, it } from 'vitest';
import { RequestHeaders } from './RequestHeaders.js';

describe(RequestHeaders, () => {
  it('should return immutable copy of headers', () => {
    const init = {
      foo: 'bar',
    };
    expect(RequestHeaders(init)).toEqual({
      foo: 'bar',
    });
    expect(RequestHeaders(init)).not.toBe(init);
  });
  it('should work with iterable of tuple', () => {
    const init = [['foo', 'bar'] as const];
    expect(RequestHeaders(init)).toEqual({
      foo: 'bar',
    });
    expect(RequestHeaders(init)).not.toBe(init);
  });
});
