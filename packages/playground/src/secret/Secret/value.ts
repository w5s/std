import type { Secret } from '../Secret.js';

import { state } from '../internal/state.js';

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
  return state.get(self);
}
