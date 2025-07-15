import type { Option } from '@w5s/core';
import type { ContainerProvider } from './ContainerProvider.js';
import type { ContainerKey } from './ContainerKey.js';
import type { ContainerProviderFunction } from './ContainerProviderFunction.js';

/**
 * Return a new provider for a key
 *
 * @example
 * ```typescript
 * const ServiceA = ContainerKey<{ doA: () => void }>('ServiceA', { doA: () => {} });
 * const ServiceB = ContainerKey<{ doB: (_: ContainerRequire<typeof ServiceA>) => void }>('ServiceB', { doB: () => {} });
 *
 * const emptyApp = {};
 * const appWithServiceA = provide(ServiceA, providerA)(emptyApp);
 * const appWithServiceB = provide(ServiceB, providerB)(appWithServiceA);
 * ```
 * @param key
 * @param provider
 */
export function provide<Requirement extends {}, Key extends string | symbol, Value>(
  key: ContainerKey<Key, Option<Value>>,
  provider: ContainerProviderFunction<Requirement, Value>,
): <AppContext extends Requirement>(appContext: AppContext) => AppContext & ContainerProvider<Requirement, Key, Value> {
  return <AppContext extends Requirement>(appContext: AppContext) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    ({
      ...appContext,
      [key.containerKey]: provider,
    }) as any;
}
