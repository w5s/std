import { describe, expect, it } from '@jest/globals';
import { Ref } from '@w5s/core';
import { applicationState } from './state.js';
import { globalStorage } from './globalStorage.js';

describe('applicationStore', () => {
  it('should be a ref', () => {
    expect(Ref.hasInstance(applicationState)).toBe(true);
  });
  it('should store data in globalStorage', () => {
    expect(applicationState.current).toEqual({});

    applicationState.current = {
      ...applicationState.current,
      foo: { bar: true },
    };
    expect(applicationState.current).toEqual({
      foo: { bar: true },
    });
    expect(globalStorage.get('application')).toEqual({
      foo: { bar: true },
    });
  });
});
