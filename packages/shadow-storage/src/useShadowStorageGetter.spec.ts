import { describe, expect, it } from 'vitest';

import { useShadowStorageGetter } from './useShadowStorageGetter.js';

describe(useShadowStorageGetter, () => {
  const anyHostObject = {};
  const anyKey = Symbol('anyKey');
  it('returns a new value', () => {
    const getMyState = useShadowStorageGetter(anyHostObject);
    const myState = getMyState(anyKey, () => ({ foo: true }));

    expect(myState).toEqual({ foo: true });
    expect(getMyState(anyKey, () => ({ foo: true }))).toBe(myState);
  });
});
