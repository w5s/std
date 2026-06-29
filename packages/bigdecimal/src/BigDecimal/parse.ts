import type { Option } from '@w5s/core';
import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';

const __dotRegex = /\./;
const __digitsRegex = /^[+-]?\d+$/;

/**
 * Returns a new BigDecimal from a string
 *
 * @example
 * ```typescript
 * BigDecimal.parse('1.020'); // Option.Some(BigDecimal('1.020'))
 * BigDecimal.parse('A'); // Option.None
 * ```
 * @param expression
 */
export function parse(expression: string): Option<BigDecimal> {
  let digits: string;
  let scale: number;

  const dot = expression.search(__dotRegex);
  if (dot === -1) {
    digits = expression;
    scale = 0;
  } else {
    const lead = expression.slice(0, dot);
    const trail = expression.slice(dot + 1);
    digits = `${lead}${trail}`;
    scale = trail.length;
  }

  if (digits === '') {
    return undefined;
  }

  if (!__digitsRegex.test(digits)) {
    return undefined;
  }

  return of(BigInt(digits), scale);
}
