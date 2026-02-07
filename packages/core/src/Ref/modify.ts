import type { Ref } from '../Ref.js';

/**
 * Change the current value using a mapping function that returns the new value
 *
 * @example
 *```typescript
 * const ref = Ref('foo');
 * Ref.modify(ref, (current) => current + 'bar'); // Ref.read(ref) == 'foobar'
 * ```
 * @category Accessor
 * @param self - the reference object
 * @param mapFn - the mapping function that will be applied
 */
export function modify<Value>(self: Ref<Value>, mapFn: (current: Value) => Value): void {
  self.current = mapFn(self.current);
}
