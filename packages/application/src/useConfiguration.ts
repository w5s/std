import type { ConfigurationRef } from './ConfigurationRef.js';
import { useRef } from './useRef.js';
import { useNamespace } from './useNamespace.js';
import type { Ref } from '@w5s/core';
import type { State } from './State.js';

export function useConfiguration<Configuration>(
  name: string | { name: string },
  initial: Configuration,
  store?: Ref<State>,
): ConfigurationRef<Configuration> {
  const namespace = useNamespace(name, store);
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
