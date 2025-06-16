import { Option } from '@w5s/core';
import { BigInt } from '@w5s/num';

export function main() {
  const expressions = ['1n', '2n', 'foo'];
  for (const expression of expressions) {
    const valueOption = BigInt.parse(expression);
    if (Option.isSome(valueOption)) {
      console.log(BigInt['!='](valueOption, 1n));
    } else {
      console.error('Failed to parse the expression');
    }
  }
  // Will output
  // > true
  // > false
  // !> Failed to parse the expression
}
