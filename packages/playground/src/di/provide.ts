import type { AppContext } from './AppContext.js';
import type { InjectionKey } from './InjectionKey.js';
import type { InjectionProvider } from './InjectionProvider.js';

/**
 * Return a new provider for a key
 *
 * @example
 * ```ts
 * const ServiceA = InjectionKey<{ doA: () => void }>('ServiceA', { doA: () => {} });
 * const ServiceB = InjectionKey<{ doB: () => void }>('ServiceB', { doB: () => {} });
 *
 * const app: AppContext = {
 *   ...provide(ServiceA, providerA),
 *   ...provide(ServiceB, providerB),
 * };
 * ```
 * @param key
 * @param provider
 */
export function provide<Value>(key: InjectionKey<Value>, provider: InjectionProvider<Value>): AppContext {
  return {
    [key.injectKey]: provider,
  };
}
