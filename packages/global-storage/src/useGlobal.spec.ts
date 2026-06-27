import { describe, expect, it } from 'vitest';
import { useGlobal } from './useGlobal.js';

describe(useGlobal, () => {
  const anyKey = Symbol('anyKey');
  it('returns a new value', () => {
    const myState = useGlobal(anyKey, () => ({ foo: true }));

    expect(myState).toEqual({ foo: true });
    expect(useGlobal(anyKey, () => ({ foo: true }))).toBe(myState);
  });
});
