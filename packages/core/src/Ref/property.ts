import type { Ref } from '../Ref.js';

/**
 *
 * @example
 * ```typescript
 * const parent = Ref({ foo: true });
 * const child = Ref.property(parent, 'foo');// Ref { current: true }
 * ```
 * @param self
 * @param propertyName
 */
export function property<T extends object, Name extends keyof T>(self: Ref<T>, propertyName: Name): Ref<T[Name]> {
  const propertyRef: Ref<T[Name]> = {
    get current() {
      return self.current[propertyName] as T[Name];
    },
    set current(value) {
      self.current = {
        ...self.current,
        [propertyName]: value,
      };
    },
  };
  return propertyRef;
}
