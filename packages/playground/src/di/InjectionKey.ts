import type { Option } from '@w5s/core';

export interface InjectionKey<Value> {
  /**
   * Injection symbol key
   */
  injectKey: symbol;
  /**
   * Default implementation of the injection key
   */
  injectDefault: Value;
}
export function InjectionKey<Value>(description: string): InjectionKey<Option<Value>>;
export function InjectionKey<Value>(description: string, defaultValue: Value): InjectionKey<Value>;
export function InjectionKey<Value>(description: string, defaultValue?: Option<Value>): InjectionKey<any> {
  return {
    injectKey: Symbol(description),
    injectDefault: defaultValue,
  };
}
