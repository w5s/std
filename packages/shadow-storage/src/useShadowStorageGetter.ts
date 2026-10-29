import { useShadowStorage } from './useShadowStorage.js';

/**
 * Return a new value from the shadow storage of `hostObject` if not previously set.
 * This is handful when using hot module reload.
 *
 * @example
 * ```typescript
 * const myHostObject = {};
 * const myModuleState = useShadowStorageGetter(myHostObject)('@my-org/my-module', () => ({ foo: true }));
 * const mySymbolState = useShadowStorageGetter(myHostObject)(Symbol.for('@my-org/my-module'), () => ({ bar: true }));
 * ```
 * @param hostObject the object that hosts the storage
 */
export function useShadowStorageGetter(
  hostObject: object,
): <Value>(key: unknown, initialValue: () => Value) => Value {
  const storage = useShadowStorage(hostObject);
  return <Value>(key: unknown, initialValue: () => Value): Value => {
    let returnValue: Value;
    if (storage.has(key)) {
      returnValue = storage.get(key) as Value;
    } else {
      returnValue = initialValue();
      storage.set(key, returnValue);
    }

    return returnValue;
  };
}
