import { describe, expect, it } from 'vitest';
import { isPromiseLike } from './isPromiseLike.js';

describe('isPromiseLike()', () => {
  it('returns true only when then is a function', () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
    // eslint-disable-next-line unicorn/no-thenable
    expect(isPromiseLike({ then: () => {} })).toBe(true);
    expect(isPromiseLike(1)).toBe(false);
  });
});
