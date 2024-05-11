import type { BigDecimal } from '../BigDecimal.js';

/**
 * Returns a string representation of a BigDecimal
 *
 * @example
 * ```ts
 * BigDecimal.format(BigDecimal('1.020')); // '1.020'
 * ```
 * @param bigDecimal
 */
export function format(bigDecimal: BigDecimal): string {
  const { value, scale } = bigDecimal;
  const valueString = String(value);
  const negative = value < 0n;
  const absolute = negative ? valueString.slice(1) : valueString;
  const absoluteLength = absolute.length;

  let integralString: string;
  let decimalString: string;

  if (scale >= absoluteLength) {
    integralString = '0';
    decimalString = '0'.repeat(scale - absoluteLength) + absolute;
  } else {
    const location = absoluteLength - scale;
    if (location > absoluteLength) {
      const zeros = location - absoluteLength;
      integralString = `${absolute}${'0'.repeat(zeros)}`;
      decimalString = '';
    } else {
      decimalString = absolute.slice(location);
      integralString = absolute.slice(0, location);
    }
  }

  const complete = decimalString === '' ? integralString : `${integralString}.${decimalString}`;
  return negative ? `-${complete}` : complete;
}
