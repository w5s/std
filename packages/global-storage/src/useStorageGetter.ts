import { globalStorage } from './globalStorage.js';
import { useStorage } from './useStorage.js';

/**
 * Return a new global value from {@link globalStorage} if not previously set.
 * This is handful when using hot module reload.
 *
 * @example
 * ```typescript
 * const myHostObject = {};
 * const myModuleState = useStorageGetter(myHostObject)('@my-org/my-module', () => ({ foo: true }));
 * const mySymbolState = useStorageGetter(myHostObject)(Symbol.for('@my-org/my-module'), () => ({ bar: true }));
 * ```
 * @param hostObject the object that hosts the storage
 */
export function useStorageGetter(hostObject: object): <Value>(key: unknown, initialValue: () => Value) => Value {
  const storage = useStorage(hostObject);
  return (key, initialValue) => {
    let returnValue: Value;
    if (storage.has(key)) {
      // eslint-disable-next-line ts/no-unsafe-assignment
      returnValue = storage.get(key) as Value;
    } else {
      returnValue = initialValue();
      storage.set(key, returnValue);
    }
    // eslint-disable-next-line ts/no-unsafe-return
    return returnValue;
  };
}
