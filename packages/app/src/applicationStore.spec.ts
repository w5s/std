import { describe, expect, it } from '@jest/globals';
import { Ref } from '@w5s/core';
import { applicationStore } from './applicationStore.js';
import { globalStorage } from './globalStorage.js';

describe('applicationStore', () => {
  it('should be a ref', () => {
    expect(Ref.hasInstance(applicationStore)).toBe(true);
  });
  it('should store data in globalStorage', () => {
    expect(applicationStore.current).toEqual({});

    applicationStore.current = {
      ...applicationStore.current,
      foo: { bar: true },
    };
    expect(applicationStore.current).toEqual({
      foo: { bar: true },
    });
    expect(globalStorage.get('application')).toEqual({
      foo: { bar: true },
    });
  });
});
