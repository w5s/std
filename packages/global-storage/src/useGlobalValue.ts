import { globalStorage } from './globalStorage.js';

/**
 * Return a new global value if not previously set.
 * This is handful when using hot module reload.
 *
 * @example
 * ```typescript
 * const myModuleState = useGlobalValue('@my-org/my-module', () => ({ foo: true }));
 * const mySymbolState = useGlobalValue(Symbol.for('@my-org/my-module'), () => ({ bar: true }));
 * ```
 * @param key - the value key
 * @param initialValue - the value initializer
 */
export function useGlobalValue<Value>(key: unknown, initialValue: () => Value) {
  let returnValue: Value;
  if (globalStorage.has(key)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    returnValue = globalStorage.get(key);
  } else {
    returnValue = initialValue();
    globalStorage.set(key, returnValue);
  }
  return returnValue;
}
