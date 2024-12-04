import { Ref } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { ApplicationTest } from './ApplicationTest.js';

describe('ApplicationTest', () => {
  it('should return new application', () => {
    const store = Ref({});
    const id = 'test-app';
    expect(ApplicationTest(id, { foo: 1, bar: 2 }, store)).toEqual({
      id,
      initialConfiguration: {
        foo: 1,
        bar: 2,
      },
      state: {
        current: {
          configuration: {
            foo: 1,
            bar: 2,
          },
        },
      },
      store,
      configure: expect.any(Function),
      get: expect.any(Function),
    });
  });
  it('should return a reference to store', () => {
    const id = 'test-app';
    const app = ApplicationTest(id, { foo: 1, bar: 2 });
    expect(app.store.current).toEqual({
      'application/test-app': {
        configuration: {
          bar: 2,
          foo: 1,
        },
      },
    });
  });
});
