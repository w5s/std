import type { Secret } from '../Secret.js';
import { Secret as SecretImpl } from './Secret.js';

/**
 * Returns a new Secret from `value`
 *
 * @example
 * ```ts
 * Secret.of('value');// Secret { '<secret>' }
 * ```
 * @param value
 */
export function of<T>(value: T): Secret<T> {
  return new SecretImpl(value) as unknown as Secret<T>;
}
