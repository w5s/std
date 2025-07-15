/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Option } from '@w5s/core';
import type { ContainerProvider } from './ContainerProvider.js';
import type { ContainerKey } from './ContainerKey.js';
import type { ContainerProviderFunction } from './ContainerProviderFunction.js';

interface Cacheable {
  [use.cache]: use.Cache;
}

function cacheFor(appContext: object): use.Cache {
  // @ts-ignore we know what we are doing
  const cache = appContext[use.cache] as use.Cache | undefined;

  if (cache === undefined || cache.appContext !== appContext) {
    const cacheNew = { appContext };

    (appContext as unknown as Cacheable)[use.cache] = cacheNew;
    return cacheNew;
  }
  return cache;
}

function cacheGet<Key extends string | symbol, Value>(
  appContext: Partial<ContainerProvider<any, Key, Option<Value>>>,
  cache: use.Cache,
  key: ContainerKey<Key, Value>,
): Value {
  const { containerKey } = key;
  // @ts-ignore We can use containerKey as key
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value: Value = cache[containerKey] ?? (cache[containerKey] = getProvider(appContext, key)(appContext));
  return value;
}

function getProvider<Key extends string | symbol, Value>(
  appContext: ContainerProvider<any, Key, Value>,
  { containerKey, containerDefaultProvider }: ContainerKey<Key, Value>,
): ContainerProviderFunction<any, Value> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return appContext[containerKey] ?? containerDefaultProvider;
}

/**
 * Return the container value
 *
 * @example
 * ```typescript
 * interface SomeServiceInterface { ... }
 * const SomeService = ContainerKey<'SomeService', SomeServiceInterface>('SomeService');
 * const appContext: AppContext = // ...
 *
 * const someService = use(appContext, SomeService);// typeof someService == SomeServiceInterface
 * ```
 * @param appContext - the app context container
 * @param key - the injection key
 */
export function use<Key extends string | symbol, Value>(
  appContext: Partial<ContainerProvider<any, Key, Option<Value>>>,
  key: ContainerKey<Key, NonNullable<Value>>,
): Value;
export function use<Key extends string | symbol, Value>(
  appContext: ContainerProvider<any, Key, Value>,
  key: ContainerKey<Key, Value>,
): Value;
export function use(appContext: any, key: any) {
  return cacheGet(appContext, cacheFor(appContext), key);
}
export namespace use {
  export const cache: unique symbol = Symbol('use.cache');

  export interface Cache {
    /**
     * The app context
     */
    appContext: object;
    [key: symbol]: any;
  }
}
