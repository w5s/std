import type { AppContext } from './AppContext.js';
import type { InjectionKey } from './InjectionKey.js';

interface Cacheable {
  [use.cache]: use.Cache;
}

export function use<Value>(appContext: AppContext, key: InjectionKey<Value>): Value {
  const { injectKey, injectDefault } = key;
  // Get memo cache
  const cache = (appContext[use.cache] ?? ((appContext as unknown as Cacheable)[use.cache] = {})) as {
    [key: symbol]: Value;
  };
  // Get or Set value
  const value =
    cache[injectKey] ?? (cache[injectKey] = (appContext[injectKey]?.(appContext) as Value) ?? injectDefault);
  return value;
}
export namespace use {
  export const cache: unique symbol = Symbol('use.cache');

  export interface Cache {
    [key: symbol]: any;
  }
}
