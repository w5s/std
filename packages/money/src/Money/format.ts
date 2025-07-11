import type { Money } from './Money.js';
import { MoneyAsString } from './MoneyAsString.js';

/**
 * Returns a formatted representation of money
 *
 * @example
 * ```typescript
 * Money.format(EUR('1.10'));// '1.10EUR';
 * ```
 * @param self
 */
export function format(self: Money): string {
  return MoneyAsString.asString(self);
}
