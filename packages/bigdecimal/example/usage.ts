import { BigDecimal } from '@w5s/bigdecimal';

export function main(): void {
  const left = BigDecimal('0.1');
  const right = BigDecimal('2.5');
  console.log(BigDecimal['<='](left, right)); // false
}
