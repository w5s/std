import { describe, expect, it } from 'vitest';
import { Ref } from '@w5s/core';
import { useConfiguration } from './useConfiguration.js';

describe(useConfiguration, () => {
  it('should initialize configuration and expose initial', () => {
    const store = Ref({});
    const meta = { name: 'app' } as const;
    const initial = { mode: 'light', retries: 2 };

    const configuration = useConfiguration(meta, initial, store);

    expect(configuration.current).toEqual(initial);
    expect(configuration.initial).toEqual(initial);
    expect(store.current).toEqual({
      app: {
        configuration: initial,
      },
    });
  });

  it('should support get, update, and modify', () => {
    const store = Ref({});
    const meta = { name: 'app' } as const;
    const initial = { mode: 'light', retries: 2 };

    const configuration = useConfiguration(meta, initial, store);

    expect(configuration.get('mode')).toBe('light');

    const previous = configuration.current;
    configuration.update({ retries: 3 });
    expect(configuration.current).toEqual({ mode: 'light', retries: 3 });
    expect(configuration.current).not.toBe(previous);

    configuration.modify((current) => ({ ...current, mode: 'dark' }));
    expect(configuration.current).toEqual({ mode: 'dark', retries: 3 });
  });

  it('should not override existing configuration in store', () => {
    const store = Ref({
      app: {
        configuration: { mode: 'dark', retries: 5 },
        other: true,
      },
    });
    const meta = { name: 'app' } as const;
    const initial = { mode: 'light', retries: 1 };

    const configuration = useConfiguration(meta, initial, store);

    expect(configuration.current).toEqual({ mode: 'dark', retries: 5 });
    expect(store.current.app).toEqual({
      configuration: { mode: 'dark', retries: 5 },
      other: true,
    });
  });
});
