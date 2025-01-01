import type { Container } from './Container.js';
import type { ContainerKey } from './ContainerKey.js';
import type { ContainerProvider } from './ContainerProvider.js';

/**
 * Return a new provider for a key
 *
 * @example
 * ```typescript
 * const ServiceA = ContainerKey<{ doA: () => void }>('ServiceA', { doA: () => {} });
 * const ServiceB = ContainerKey<{ doB: () => void }>('ServiceB', { doB: () => {} });
 *
 * const app: Container = {
 *   ...provide(ServiceA, providerA),
 *   ...provide(ServiceB, providerB),
 * };
 * ```
 * @param key
 * @param provider
 */
export function provide<Value>(key: ContainerKey<Value>, provider: ContainerProvider<Value>): Container {
  return {
    [key.containerKey]: provider,
  };
}
