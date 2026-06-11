import { __state } from '../__state.js';
import type { Secret } from '../Secret.js';

/**
 * Returns the content of self
 *
 * @example
 * ```ts
 * const secret = Secret('value');
 * Secret.value(secret);// 'value'
 * ```
 * @param self
 */
export function value<T>(self: Secret<T>): T {
  return __state.get(self);
}
