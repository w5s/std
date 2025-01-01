import { Result } from '@w5s/core';
import { Task } from '@w5s/task';

function parseNumber(expr: string) {
  const parsed = Number(expr);

  // - Return a immutable Result object
  // - Avoid throwing error because impure
  // - Avoid using NaN because the error case is implicit in the typing
  return Number.isNaN(parsed) ? Result.Ok(parsed) : Result.Error('NotANumber');
}

function log(value: unknown) {
  // This is a lazy operation that will only be evaluated when the Task is run
  return Task.create(({ ok }) => ok(console.log(value)));
}

export function main() {
  const parsed = parseNumber('1.1'); // Result.Ok(1.1)
  const computed = Result.map(parsed, (amount) => amount + 2); // Result.Ok(3.1)

  // Lazy operation that will display in console the computed result when evaluated
  return log(computed);
}

// runTask is impure and should be put at the edge of the program
void Task.unsafeRun(main()); // prints { _: 'Result/Ok', value: 3.1 }
