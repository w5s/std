<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5S ${description} _(${name})_&unknownTxt= ) -->
# W5S Task modules _(@w5s/task)_
<!-- AUTO-GENERATED-CONTENT:END -->

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=```sh\nnpm install ${name}\n```) -->
```sh
npm install @w5s/task
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

### Example

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->
<!-- The below code snippet is automatically added from ./example/usage.ts -->
```ts
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
void Task.run(main()); // prints { _: 'Result/Ok', value: 3.1 }
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License

[MIT][license-url] © Julien Polo [julien.polo@gmail.com](mailto:julien.polo@gmail.com)

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->
[package-version-svg]: https://img.shields.io/npm/v/@w5s/task.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->
[package-url]: https://www.npmjs.com/package/@w5s/task
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
[license-url]: https://github.com/w5s/project-config/blob/HEAD/packages/core/LICENSE
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[issues-url]: ${bugs.url}) -->
[issues-url]: https://github.com/w5s/std/issues
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[sources-url]: ${repository.url}) -->
[sources-url]: git@github.com:w5s/std.git
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[homepage-url]: ${homepage}) -->
[homepage-url]: https://github.com/w5s/std/tree/master/packages/std#readme
<!-- AUTO-GENERATED-CONTENT:END -->
