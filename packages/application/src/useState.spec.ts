import { describe, expect, it } from 'vitest';
import { Ref } from '@w5s/core';
import { useState } from './useState.js';

describe(useState, () => {
  it('should initialize state for namespace and key', () => {
    const store = Ref({});
    const meta = { name: 'app' } as const;

    const counter = useState(meta, 'counter', 1, store);

    expect(counter.current).toBe(1);
    expect(store.current).toEqual({
      app: {
        state: {
          counter: 1,
        },
      },
    });
  });

  it('should not override existing state value', () => {
    const store = Ref({
      app: {
        state: {
          counter: 5,
        },
      },
    });
    const meta = { name: 'app' } as const;

    const counter = useState(meta, 'counter', 1, store);

    expect(counter.current).toBe(5);
    expect(store.current.app.state).toEqual({ counter: 5 });
  });

  it('should preserve other namespace data when adding state', () => {
    const store = Ref({
      app: {
        configuration: { mode: 'dark' },
      },
    });
    const meta = { name: 'app' } as const;

    const counter = useState(meta, 'counter', 1, store);

    expect(counter.current).toBe(1);
    expect(store.current).toEqual({
      app: {
        configuration: { mode: 'dark' },
        state: { counter: 1 },
      },
    });
  });
});
