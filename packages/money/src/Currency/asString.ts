import type { Currency } from './Currency.js';

/**
 * Returns a formatted representation of money
 *
 * @example
 * ```typescript
 * Currency.asString(EUR('1.10'));// '1.10EUR';
 * ```
 * @param self
 */
export function asString(self: Currency): string {
  return self.code;
}
