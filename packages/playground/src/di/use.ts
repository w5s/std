import type { AppContext } from './AppContext.js';
import type { InjectionKey } from './InjectionKey.js';

interface Cacheable {
  [use.cache]: use.Cache;
}

function cacheFor(appContext: AppContext): use.Cache {
  // eslint-disable-next-line no-return-assign
  return (appContext[use.cache] ?? ((appContext as unknown as Cacheable)[use.cache] = {})) as use.Cache;
}

/**
 * Return the container value
 *
 * @example
 * ```ts
 * interface SomeServiceInterface { ... }
 * const SomeService = InjectionKey<SomeServiceInterface>('SomeService');
 * const appContext: AppContext = // ...
 *
 * const someService = use(appContext, SomeService);// typeof someService == SomeServiceInterface
 * ```
 * @param appContext - the app context container
 * @param key - the injection key
 */
export function use<Value>(appContext: AppContext, key: InjectionKey<Value>): Value {
  const { injectKey, injectDefault } = key;
  // Get memo cache
  const cache = cacheFor(appContext);
  // Get or Set value
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value: Value =
    cache[injectKey] ?? (cache[injectKey] = (appContext[injectKey] ?? injectDefault)(appContext) as Value);
  return value;
}
export namespace use {
  export const cache: unique symbol = Symbol('use.cache');

  export interface Cache {
    [key: symbol]: any;
  }
}
