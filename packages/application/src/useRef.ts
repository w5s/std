import type { Ref } from '@w5s/core';
import { __hasOwn } from '@w5s/core/dist/__hasOwn.js';
import type { Storage } from '@w5s/global-storage';

function useRefMap<T>(ref: Ref<Record<string | symbol, unknown>>, propertyName: string, initialValue: T): Ref<T> {
  const propertyRef: Ref<T> = {
    get current() {
      return ref.current[propertyName] as T;
    },
    set current(value) {
      ref.current = {
        ...ref.current,
        [propertyName]: value,
      };
    },
  };

  if (!__hasOwn(ref.current, propertyName)) {
    propertyRef.current = initialValue;
  }
  return propertyRef;
}

function useRefStorage<V>(hostObject: Storage, key: string, initialValue: V): Ref<V> {
  const ref: Ref<V> = {
    get current() {
      return hostObject.get(key) as V;
    },
    set current(value: V) {
      hostObject.set(key, value);
    },
  };
  if (!hostObject.has(key)) {
    ref.current = initialValue;
  }
  return ref;
}

/**
 * Return a new `Ref` stored at `storage.get(key)` or `ref.value[key]`
 *
 * @example
 * ```typescript
 * const globalStorage = useStorage(globalThis);
 * const counterRef = useRef<number>(globalStorage, 'counter', 1);
 * // globalStorage == Map { counter => 1 }
 *
 * const state = Ref({});
 * const counterRef = useRef<number>(state, 'counter', 2);
 * // state == { counter: 2 }
 * ```
 * @param hostObject - the ref or storage containing the value
 * @param key - the key where data is stored
 * @param initialValue - the initial value
 */
export function useRef<V>(
  hostObject: Ref<Record<string | symbol, unknown>> | Storage,
  key: string,
  initialValue: V,
): Ref<V> {
  return 'get' in hostObject ? useRefStorage(hostObject, key, initialValue) : useRefMap(hostObject, key, initialValue);
}
