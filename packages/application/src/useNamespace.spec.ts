import { describe, expect, it } from 'vitest';
import { Ref } from '@w5s/core';
import { useNamespace } from './useNamespace.js';

describe(useNamespace, () => {
  it('should create namespace in store when missing', () => {
    const store = Ref({});
    const meta = { name: 'app' } as const;

    const namespace = useNamespace(meta, store);

    expect(namespace.current).toEqual({});
    expect(store.current).toEqual({ app: {} });
  });

  it('should return existing namespace from store', () => {
    const existing = { configuration: { mode: 'dark' }, state: { counter: 2 } };
    const store = Ref({ app: existing });
    const meta = { name: 'app' } as const;

    const namespace = useNamespace(meta, store);

    expect(namespace.current).toEqual(existing);
    expect(namespace.current).toBe(existing);
  });

  it('should keep other namespaces intact when updating current namespace', () => {
    const store = Ref({ other: { state: { value: 1 } } });
    const meta = { name: 'app' } as const;

    const namespace = useNamespace(meta, store);
    namespace.current = { configuration: { retries: 2 } };

    expect(store.current).toEqual({
      other: { state: { value: 1 } },
      app: { configuration: { retries: 2 } },
    });
  });
});
