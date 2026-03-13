import type { ConfigurationRef } from './ConfigurationRef.js';
import { useRef } from './useRef.js';
import { useNamespace } from './useNamespace.js';
import type { Ref } from '@w5s/core';
import type { State } from './State.js';
import type { Meta } from './meta.js';

/**
 *
 * @example
 * ```typescript
 * const app = { name: 'my-app' };
 * const configRef = useConfiguration(app, { mode: 'light', retries: 3 });
 * configRef.update({ retries: 4 });
 * console.log(configRef.current); // { mode: 'light', retries: 4 }
 * ```
 * @param meta
 * @param initial
 * @param store
 */
export function useConfiguration<Configuration>(
  meta: Meta,
  initial: Configuration,
  store?: Ref<State>,
): ConfigurationRef<Configuration> {
  const namespace = useNamespace(meta, store);
  const configuration = useRef(namespace, 'configuration', initial);

  function modify(fn: (current: Configuration) => Configuration): void {
    configuration.current = fn(configuration.current);
  }

  function update(patch: Partial<Configuration>) {
    configuration.current = { ...configuration.current, ...patch };
  }

  function get<Key extends keyof Configuration>(key: Key): Configuration[Key] {
    return configuration.current[key];
  }

  return Object.assign(configuration, {
    initial,
    get,
    update,
    modify,
  });
}
