import { globalStorage } from './globalStorage.js';

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
export function useGlobal<Value>(key: unknown, initialValue: () => Value) {
  let returnValue: Value;
  if (globalStorage.has(key)) {
    returnValue = globalStorage.get(key);
  } else {
    returnValue = initialValue();
    globalStorage.set(key, returnValue);
  }
  return returnValue;
}
