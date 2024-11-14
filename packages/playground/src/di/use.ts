import type { AppContext } from './AppContext.js';
import type { InjectionKey } from './InjectionKey.js';
import type { InjectionProvider } from './InjectionProvider.js';

interface Cacheable {
  [use.cache]: use.Cache;
}

function cacheFor(appContext: AppContext): use.Cache {
  const cache = appContext[use.cache] as use.Cache | undefined;

  if (cache === undefined || cache.appContext !== appContext) {
    const cacheNew = { appContext };

    (appContext as unknown as Cacheable)[use.cache] = cacheNew;
    return cacheNew;
  }
  return cache;
}

function cacheGet<Value>(appContext: AppContext, cache: use.Cache, key: InjectionKey<Value>): Value {
  const { injectKey } = key;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value: Value = cache[injectKey] ?? (cache[injectKey] = getProvider(appContext, key)(appContext));
  return value;
}

function getProvider<Value>(
  appContext: AppContext,
  { injectKey, injectDefault }: InjectionKey<Value>,
): InjectionProvider<Value> {
  return (appContext[injectKey] as InjectionProvider<Value> | undefined) ?? injectDefault;
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
  return cacheGet(appContext, cacheFor(appContext), key);
}
export namespace use {
  export const cache: unique symbol = Symbol('use.cache');

  export interface Cache {
    /**
     * The app context
     */
    appContext: AppContext;
    [key: symbol]: any;
  }
}
