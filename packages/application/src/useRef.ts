import type { Ref } from '@w5s/core';
import { useStorage } from './useStorage.js';

/**
 * Return a new `Ref` stored at `globalStorage.get(key)`
 *
 * @example
 * ```ts
 * const counter = useRef<number>('some', 0);
 * counter.current += 1;
 * console.log(counter.current);// 1
 * ```
 * @param key - the key where date is stored
 * @param initialValue - the initial value
 */
export function useRef<V>(key: string, initialValue: V): Ref<V> {
  const globalStorage = useStorage(globalThis);
  const ref: Ref<V> = {
    get current() {
      return globalStorage.get(key) as V;
    },
    set current(value: V) {
      globalStorage.set(key, value);
    },
  };
  if (!globalStorage.has(key)) {
    ref.current = initialValue;
  }
  return ref;
}
