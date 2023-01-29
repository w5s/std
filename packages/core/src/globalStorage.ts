import type { Option } from './option.js';
import type { Ref } from './ref.js';

// Inline
const $globalStorage = Symbol.for('@w5s/globalStorage');

/**
 * Type for the global Map that holds all application states
 */
export interface GlobalStorage extends Map<GlobalStorage.Key, GlobalStorage.Value> {}

export const GlobalStorage = Map;

export namespace GlobalStorage {
  /**
   * Typeof globalStorage keys
   */
  export type Key = string;
  /**
   * Typeof globalStorage values
   */
  export type Value = unknown;
}

/**
 * A global Map that holds all application states
 */
export const globalStorage: GlobalStorage = (() => {
  const globalObject = (typeof window === 'undefined' ? globalThis : window) as {
    [P in string | symbol]: unknown;
  };

  // eslint-disable-next-line no-return-assign
  return (
    (globalObject[$globalStorage] as Option<GlobalStorage>) ?? (globalObject[$globalStorage] = new GlobalStorage())
  );
})();

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
