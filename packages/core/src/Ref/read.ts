import type { Ref } from '../Ref.js';

/**
 * Returns the current ref value
 *
 * @example
 *```typescript
 * const ref = Ref('foo');
 * Ref.read(ref); // 'foo'
 * ```
 * @category Accessor
 * @param self - the reference object
 */
export function read<Value>(self: Ref<Value>): Value {
  return self.current;
}
