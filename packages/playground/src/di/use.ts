import type { Container } from './Container.js';
import type { ContainerKey } from './ContainerKey.js';
import type { ContainerProvider } from './ContainerProvider.js';

interface Cacheable {
  [use.cache]: use.Cache;
}

function cacheFor(appContext: Container): use.Cache {
  const cache = appContext[use.cache] as use.Cache | undefined;

  if (cache === undefined || cache.appContext !== appContext) {
    const cacheNew = { appContext };

    (appContext as unknown as Cacheable)[use.cache] = cacheNew;
    return cacheNew;
  }
  return cache;
}

function cacheGet<Value>(appContext: Container, cache: use.Cache, key: ContainerKey<Value>): Value {
  const { containerKey } = key;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value: Value = cache[containerKey] ?? (cache[containerKey] = getProvider(appContext, key)(appContext));
  return value;
}

function getProvider<Value>(
  appContext: Container,
  { containerKey, containerDefaultProvider }: ContainerKey<Value>,
): ContainerProvider<Value> {
  return (appContext[containerKey] as ContainerProvider<Value> | undefined) ?? containerDefaultProvider;
}

/**
 * Return the container value
 *
 * @example
 * ```ts
 * interface SomeServiceInterface { ... }
 * const SomeService = ContainerKey<SomeServiceInterface>('SomeService');
 * const appContext: AppContext = // ...
 *
 * const someService = use(appContext, SomeService);// typeof someService == SomeServiceInterface
 * ```
 * @param appContext - the app context container
 * @param key - the injection key
 */
export function use<Value>(appContext: Container, key: ContainerKey<Value>): Value {
  return cacheGet(appContext, cacheFor(appContext), key);
}
export namespace use {
  export const cache: unique symbol = Symbol('use.cache');

  export interface Cache {
    /**
     * The app context
     */
    appContext: Container;
    [key: symbol]: any;
  }
}
