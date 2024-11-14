import type { Option } from '@w5s/core';
import type { ContainerProvider } from './ContainerProvider.js';

/**
 * An injection key (as a symbol) with an optional default provider
 */
export interface ContainerKey<Value> {
  /**
   * Injection symbol key
   */
  containerKey: symbol;
  /**
   * Default implementation of the key
   */
  containerDefaultProvider: ContainerProvider<Value>;
}
export function ContainerKey<Value>(description: string): ContainerKey<Option<Value>>;
export function ContainerKey<Value>(description: string, defaultValue: ContainerProvider<Value>): ContainerKey<Value>;
export function ContainerKey<Value>(
  description: string,
  defaultProvider?: Option<ContainerProvider<Value>>,
): ContainerKey<any> {
  return {
    containerKey: Symbol(description),
    containerDefaultProvider: defaultProvider ?? (() => undefined),
  };
}
