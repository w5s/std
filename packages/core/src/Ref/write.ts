import type { Ref } from '../Ref.js';

/**
 * Change the current value
 *
 * @example
 *```typescript
 * const ref = Ref('foo');
 * Ref.write(ref, 'bar'); // Ref.read(ref) == 'bar'
 * ```
 * @category Accessor
 * @param self - the reference object
 * @param newValue - the new value to be set
 */
export function write<Value>(self: Ref<Value>, newValue: Value): void {
  self.current = newValue;
}
