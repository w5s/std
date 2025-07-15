import type { Option } from '@w5s/core';
import type { ContainerProviderFunction } from './ContainerProviderFunction.js';

/**
 * An injection key (as a symbol) with an optional default provider
 */
export interface ContainerKey<Key extends string | symbol, Value> {
  /**
   * Injection symbol key
   */
  containerKey: Key;
  /**
   * Default implementation of the key
   */
  containerDefaultProvider: ContainerProviderFunction<{}, Value>;
}
export function ContainerKey<Key extends string | symbol, Value>(key: Key): ContainerKey<Key, Option<Value>>;
export function ContainerKey<Key extends string | symbol, Value>(
  key: Key,
  defaultValue: ContainerProviderFunction<{}, Value>,
): ContainerKey<Key, Value>;
export function ContainerKey<Value>(
  key: any,
  defaultProvider?: Option<ContainerProviderFunction<{}, Value>>,
): ContainerKey<any, any> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    containerKey: key,
    containerDefaultProvider: defaultProvider ?? (() => undefined),
  };
}
