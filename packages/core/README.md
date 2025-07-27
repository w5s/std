<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5S ${description} _(${name})_&unknownTxt= ) -->
# W5S Core modules _(@w5s/core)_
<!-- AUTO-GENERATED-CONTENT:END -->

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=```sh\nnpm install ${name}\n```) -->
```sh
npm install @w5s/core
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

### Enforce STD to write better code

| VanillaJS                      | STD                            | Explanation                                                                                                                                                                                                           |
|--------------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `null`, `undefined`               | `Option`                        | Stop spending time choosing between `undefined` and `null`. Based on Microsoft standard, undefined (== `Option.None`) is preferred.                                                                                         |
| `throw new Error()`                  | `return Result.Error(new Error())` | Error throwing / Promise rejection is a mechanism that should only be used to stop the execution of a program. When a computation represents an expected failure (ex: parsing, data fetching), `Result` should be used. |
| `Promise`                        | `Task`                     | `Task` is like a Promise but lazily evaluated. It has numerous advantages (composable, etc). [See Article](https://dev.to/anthonyjoeseph/should-i-use-fp-ts-task-h52)                                                   |
| N/A                              | `Time`, `Duration`                 | Tagged types that makes the unit of time explicit (milliseconds). Some libraries could use seconds or minutes implicitly which is confusing                                                                                                   |
| `setTimeout(fn, ms)`                       | `Task.andThen(Time.delay(ms), fn)`                       | `setTimeout` is impure, create a task that will run after `Time.delay`.                                                                                                                                                                 |
| `Date.now`                       | `Time.now`                       | `Date.now` is impure, use `Time.now` that is a `Task`.                                                                                                                                                                 |
| `console.debug`                  | `Console.debug`                  | `console.debug` is impure, use `Console.debug` that is a `Task`.                                                                                                                                                       |
| `Math.random`                    | `randomNumber`                  | `Math.random` is impure, use `randomNumber` that is a `Task`.                                                                                                                                                                 |
| `UUID`, ...                      | `Task`                      | More impure function, wrap them in a `Task()`                                                                                                                                                                      |
| N/A                            | `Int`                            | A tagged type that narrows `number` to only the safe integer values                                                                                                                                                         |
| `[].map`, `[].filter`, ...       | `Array.map`, `Array.filter`, ...  | Array module contains all immutable operations on arrays.                                                                                                                                                         |

### Example

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->
<!-- The below code snippet is automatically added from ./example/usage.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License

[MIT][license-url] © Julien Polo [julien.polo@gmail.com](mailto:julien.polo@gmail.com)

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->
[package-version-svg]: https://img.shields.io/npm/v/@w5s/core.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->
[package-url]: https://www.npmjs.com/package/@w5s/core
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-url]: https://www.npmjs.com/package/${name}) -->
[license-url]: https://www.npmjs.com/package/@w5s/core
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[issues-url]: ${bugs.url}) -->
[issues-url]: https://github.com/w5s/std/issues
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[sources-url]: ${repository.url}) -->
[sources-url]: git@github.com:w5s/std.git
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[homepage-url]: ${homepage}) -->
[homepage-url]: https://github.com/w5s/std/tree/master/packages/std#readme
<!-- AUTO-GENERATED-CONTENT:END -->
