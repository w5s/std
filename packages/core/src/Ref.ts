export interface Ref<Value> {
  /**
   * Mutable reference to a value
   */
  current: Value;
}
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
export function Ref<Value>(initialValue: Value): Ref<Value> {
  return { current: initialValue };
}
export namespace Ref {
  /**
   * Current value symbol
   */
  export const current = 'current';

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
  export function hasInstance(anyValue: unknown): anyValue is Ref<unknown> {
    return (
      anyValue != null && (typeof anyValue === 'object' || typeof anyValue === 'function') && 'current' in anyValue
    );
  }

  /**
   * Returns the current ref value
   *
   * @example
   *```typescript
   * const ref = Ref('foo');
   * Ref.read(ref); // 'foo'
   * ```
   * @category Accessor
   * @param ref - the reference object
   */
  export function read<Value>(ref: Ref<Value>): Value {
    return ref.current;
  }

  /**
   * Change the current value
   *
   * @example
   *```typescript
   * const ref = Ref('foo');
   * Ref.write(ref, 'bar'); // Ref.read(ref) == 'bar'
   * ```
   * @category Accessor
   * @param ref - the reference object
   * @param newValue - the new value to be set
   */
  export function write<Value>(ref: Ref<Value>, newValue: Value): void {
    ref.current = newValue;
  }

  /**
   * Change the current value using a mapping function that returns the new value
   *
   * @example
   *```typescript
   * const ref = Ref('foo');
   * Ref.modify(ref, (current) => current + 'bar'); // Ref.read(ref) == 'foobar'
   * ```
   * @category Accessor
   * @param ref - the reference object
   * @param mapFn - the mapping function that will be applied
   */
  export function modify<Value>(ref: Ref<Value>, mapFn: (current: Value) => Value): void {
    ref.current = mapFn(ref.current);
  }
}
