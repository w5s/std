import type { Option } from '@w5s/core';

import type { ContainerKey } from './ContainerKey.js';
import type { ContainerProvider } from './ContainerProvider.js';
import type { ContainerProviderFunction } from './ContainerProviderFunction.js';

const $cache: unique symbol = Symbol('use.cache');

interface Cacheable {
  [$cache]: use.Cache;
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
 * @param appContext the app context container
 * @param key the injection key
 */
export function use<Key extends string | symbol, Value>(
  appContext: Partial<ContainerProvider<any, Key, Option<Value>>>,
  key: ContainerKey<Key, NonNullable<Value>>,
): Value;
export function use<Key extends string | symbol, Value>(
  appContext: ContainerProvider<any, Key, Value>,
  key: ContainerKey<Key, Value>,
): Value;
/* eslint-disable ts/no-unsafe-argument, ts/no-unsafe-assignment */
export function use(appContext: any, key: any) {
  return cacheGet(appContext, cacheFor(appContext), key);
}

function cacheFor(appContext: object): use.Cache {
  // @ts-ignore we know what we are doing
  const cache = appContext[use.cache] as undefined | use.Cache;

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

  const value: Value = cache[containerKey] ?? (cache[containerKey] = getProvider(appContext, key)(appContext));
  return value;
}
function getProvider<Key extends string | symbol, Value>(
  appContext: ContainerProvider<any, Key, Value>,
  { containerDefaultProvider, containerKey }: ContainerKey<Key, Value>,
): ContainerProviderFunction<any, Value> {
  return appContext[containerKey] ?? containerDefaultProvider;
}
use.cache = $cache;

export namespace use {
  export interface Cache {
    [key: symbol]: any;

    /**
     * The app context
     */
    appContext: object;
  }
}
