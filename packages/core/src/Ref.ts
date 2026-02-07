import { modify } from './Ref/modify.js';
import { property } from './Ref/property.js';
import { read } from './Ref/read.js';
import { write } from './Ref/write.js';

export interface Ref<Value> {
  /**
   * Mutable reference to a value
   */
  current: Value;
}

/**
 * @namespace
 */
export const Ref = Object.assign(
  /**
   * Create a new `Ref` object containing a value
   * This implementation is compatible with `React.createRef()`
   *
   * @example
   * ```typescript
   * const ref = Ref(123);// { current: initialValue }
   * ```
   * @category Constructor
   * @param initialValue - the initial value contained
   */
  // eslint-disable-next-line prefer-arrow-callback, @typescript-eslint/no-shadow
  function Ref<Value>(initialValue: Value): Ref<Value> {
    return { current: initialValue };
  },
  {
    /**
     * Current value symbol
     */
    current: 'current' as const,
    /**
     * Returns `true` when `anyValue` has a `current` property
     *
     * @example
     * ```typescript
     * Ref.hasInstance(Ref(123)) // true
     * Ref.hasInstance(null)) // false
     * ```
     * @category Type
     * @param anyValue - a tested value
     */
    hasInstance(anyValue: unknown): anyValue is Ref<unknown> {
      return (
        anyValue != null && (typeof anyValue === 'object' || typeof anyValue === 'function') && 'current' in anyValue
      );
    },
    read,
    modify,
    property,
    write,
  },
);
