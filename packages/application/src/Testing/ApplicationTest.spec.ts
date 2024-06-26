import { Ref } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { ApplicationTest } from './ApplicationTest.js';

describe('ApplicationTest', () => {
  it('should return new application', () => {
    const store = Ref({});
    const id = 'test-app';
    expect(ApplicationTest({ id, store, configuration: { foo: 1, bar: 2 } })).toEqual({
      id,
      configuration: {
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
    });
  });
  it('should return a reference to store', () => {
    const id = 'test-app';
    const app = ApplicationTest({ id, configuration: { foo: 1, bar: 2 } });
    expect(app.store.current).toEqual({
      'application/test-app': {
        configuration: {
          bar: 2,
          foo: 1,
        },
      },
    });
  });

  it('should generate a random app id if omitted', () => {
    const store = Ref({});
    const app = ApplicationTest({ store });
    expect(app.id).toMatch(/^app-/);
    expect(app.id).not.toBe(ApplicationTest({ store }).id);
  });
});
