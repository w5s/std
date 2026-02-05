import { describe, expect, it } from 'vitest';
import { useGlobalValue } from './useGlobalValue.js';

describe(useGlobalValue, () => {
  const anyKey = Symbol('anyKey');
  it('returns a new value', () => {
    const myState = useGlobalValue(anyKey, () => ({ foo: true }));

    expect(myState).toEqual({ foo: true });
    expect(useGlobalValue(anyKey, () => ({ foo: true }))).toBe(myState);
  });
});
