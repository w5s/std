/**
 * Type for the Storage Map that holds all application states
 */
export interface ShadowStorage extends Map<unknown, unknown> {}

/**
 * @namespace
 */
export const ShadowStorage = {
  /**
   * Creates a new ShadowStorage instance
   *
   * @returns A new instance of ShadowStorage
   */
  create(): ShadowStorage {
    return new Map<unknown, unknown>();
  },

  /**
   * Checks if a value is a ShadowStorage instance
   *
   * @example
   * ```ts
   * ShadowStorage.hasInstance({}); // false
   * ShadowStorage.hasInstance(new Map()); // true
   * ```
   * @param value The value to check if it is a ShadowStorage instance
   */
  hasInstance(value: unknown): value is ShadowStorage {
    return Object.prototype.toString.call(value) === '[object Map]';
  },
};
