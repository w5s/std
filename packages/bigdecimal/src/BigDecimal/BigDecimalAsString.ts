import type { AsString } from '@w5s/core';
import type { BigDecimal } from './BigDecimal.js';

export const BigDecimalAsString: AsString<BigDecimal> = {
  /**
   * Returns a string representation of a BigDecimal
   *
   * @example
   * ```typescript
   * BigDecimal.asString(BigDecimal('1.020')); // '1.020'
   * ```
   * @param self
   */
  asString(self: BigDecimal): string {
    const { value, scale } = self;
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
  },
};
