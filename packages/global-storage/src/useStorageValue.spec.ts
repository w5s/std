import { describe, expect, it } from 'vitest';

import { useStorageGetter } from './useStorageGetter.js';

describe(useStorageGetter, () => {
  const anyHostObject = {};
  const anyKey = Symbol('anyKey');
  it('returns a new value', () => {
    const getMyState = useStorageGetter(anyHostObject);
    const myState = getMyState(anyKey, () => ({ foo: true }));

    expect(myState).toEqual({ foo: true });
    expect(getMyState(anyKey, () => ({ foo: true }))).toBe(myState);
  });
});
