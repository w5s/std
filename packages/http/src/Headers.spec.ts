import { describe, expect, it } from 'vitest';
import { Headers } from './Headers.js';
import { Headers as HeadersType } from './Headers/Headers.js';
import { empty } from './Headers/empty.js';

describe(Headers, () => {
  it('is an alias to functions', () => {
    expect(Headers).toEqual(expect.objectContaining(HeadersType));
    expect(Headers).toEqual(
      expect.objectContaining({
        empty,
      }),
    );
  });
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
