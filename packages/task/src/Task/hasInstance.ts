import { Symbol } from '@w5s/core/dist/Symbol.js';
import type { TaskLike } from '../Task.js';

/**
 * Return `true` if anyValue is a valid `Task`
 *
 * @example
 * ```typescript
 * Task.hasInstance(Task.resolve(...)); // true
 * Task.hasInstance({}); // false
 * ```
 * @category Type
 * @param anyValue - a tested value
 */
export function hasInstance(anyValue: unknown): anyValue is TaskLike<unknown, unknown> {
  // @ts-ignore We know what we are doing here
  return typeof anyValue === 'object' && anyValue !== null && typeof anyValue[Symbol.run] === 'function';
}
