import type { Option } from './option.js';

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
