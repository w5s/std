import type { Ref, Record } from '@w5s/core';

const hasOwn =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn ?? ((object, propertyName) => Object.prototype.hasOwnProperty.call(object, propertyName));

/**
 * Create a new reference on `ref.current[key]` that will be initialize with `initialValue`
 *
 * @example
 * ```ts
 * const ref = Ref({}):
 * const someProperty = property(ref, 'counter', 2); // ref == { current: 2 };
 * // someProperty is { current: 2 }
 * // ref is { current: { counter: 2 } }
 *
 * someProperty.current += 1; // ref == { current: 3 };
 * ```
 * @param ref - Ref to an object
 * @param propertyName - The target property name of the object
 * @param initialValue - The initial value
 */
export function property<T>(ref: Ref<Record<string | symbol, unknown>>, propertyName: string, initialValue: T): Ref<T> {
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

  if (!hasOwn(ref.current, propertyName)) {
    propertyRef.current = initialValue;
  }
  return propertyRef;
}
