import { describe, expect, it } from 'vitest';
import { isPromise } from './isPromise.js';

describe(isPromise, () => {
  it('returns true only when then is a function', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    // eslint-disable-next-line unicorn/no-thenable
    expect(isPromise({ then: () => {} })).toBe(false);
    expect(isPromise(1)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
  });
});
