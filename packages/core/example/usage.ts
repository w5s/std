import { Result } from '@w5s/core';

function parseNumber(expr: string) {
  const parsed = Number(expr);

  // - Return a immutable Result object
  // - Avoid throwing error because impure
  // - Avoid using NaN because the error case is implicit in the typing
  return Number.isNaN(parsed) ? Result.Ok(parsed) : Result.Error('NotANumber');
}

export function main() {
  const parsed = parseNumber('1.1'); // Result.Ok(1.1)
  return Result.map(parsed, (amount) => amount + 2); // Result.Ok(3.1)
}

// runTask is impure and should be put at the edge of the program
void main(); // prints { _: 'Result/Ok', value: 3.1 }
