import { globalStorage } from './globalStorage.js';
import { useShadowStorageGetter } from './useShadowStorageGetter.js';

const getGlobalValue = useShadowStorageGetter(globalStorage);

/**
 * Return a new global value from {@link globalStorage} if not previously set.
 * This is handful when using hot module reload.
 *
 * @example
 * ```typescript
 * const myModuleState = useGlobal('@my-org/my-module', () => ({ foo: true }));
 * const mySymbolState = useGlobal(Symbol.for('@my-org/my-module'), () => ({ bar: true }));
 * ```
 * @param key the value key
 * @param initialValue the value initializer
 */
export function useGlobal<Value>(key: unknown, initialValue: () => Value): Value {
  return getGlobalValue(key, initialValue);
}
