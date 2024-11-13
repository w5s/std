import type { Option } from '@w5s/core';
import type { InjectionProvider } from './InjectionProvider.js';

/**
 * An injection key (as a symbol) with an optional default provider
 */
export interface InjectionKey<Value> {
  /**
   * Injection symbol key
   */
  injectKey: symbol;
  /**
   * Default implementation of the injection key
   */
  injectDefault: InjectionProvider<Value>;
}
export function InjectionKey<Value>(description: string): InjectionKey<Option<Value>>;
export function InjectionKey<Value>(description: string, defaultValue: InjectionProvider<Value>): InjectionKey<Value>;
export function InjectionKey<Value>(
  description: string,
  defaultProvider?: Option<InjectionProvider<Value>>,
): InjectionKey<any> {
  return {
    injectKey: Symbol(description),
    injectDefault: defaultProvider ?? (() => undefined),
  };
}
