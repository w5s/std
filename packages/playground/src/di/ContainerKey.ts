import type { Option } from '@w5s/core';

import type { ContainerProviderFunction } from './ContainerProviderFunction.js';

/**
 * An injection key (as a symbol) with an optional default provider
 */
export interface ContainerKey<Key extends string | symbol, Value> {
  /**
   * Default implementation of the key
   */
  containerDefaultProvider: ContainerProviderFunction<{}, Value>;

  /**
   * Injection symbol key
   */
  containerKey: Key;
}
export function ContainerKey<Key extends string | symbol, Value>(key: Key): ContainerKey<Key, Option<Value>>;
export function ContainerKey<Key extends string | symbol, Value>(
  key: Key,
  defaultValue: ContainerProviderFunction<{}, Value>,
): ContainerKey<Key, Value>;
export function ContainerKey<Key extends string | symbol, Value>(
  key: Key,
  defaultProvider?: Option<ContainerProviderFunction<{}, Value>>,
): ContainerKey<Key, Value> {
  return {
    containerDefaultProvider: defaultProvider ?? (() => undefined as Value),
    containerKey: key,
  };
}
