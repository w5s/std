<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5S ${description} _(${name})_&unknownTxt= ) -->

# W5S Task modules _(@w5s/task)_

<!-- AUTO-GENERATED-CONTENT:END -->

[NPM Version][package-url]
[License][license-url]

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
import { Task } from '@w5s/task';

function randomNumber() {
  return Task.create(() => Task.ok(Math.random()));
}

function log(value: unknown) {
  // This is a lazy operation that will only be evaluated when the Task is run
  return Task.create(() => Task.ok(console.log(value)));
}

// This function returns a task that will do nothing until Task.run is called on it
export function main() {
  // 1. Generate a random number
  const randomValueTask = randomNumber();
  // 2. Compute square value
  const squareValueTask = Task.map(randomValueTask, (value) => value * value);
  // 3. Log value in console
  return Task.andThen(squareValueTask, log);
}

// runTask is impure and should be put at the edge of the program
void Task.run(main()); // prints { _: 'Result/Ok', value: <random number> * <random number> }
```

<!-- AUTO-GENERATED-CONTENT:END -->

## License

[MIT][license-url] © Julien Polo [julien.polo@gmail.com](mailto:julien.polo@gmail.com)

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[issues-url]: ${bugs.url}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[sources-url]: ${repository.url}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[homepage-url]: ${homepage}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

[package-version-svg]: https://img.shields.io/npm/v/@w5s/task.svg?style=flat-square
[package-url]: https://www.npmjs.com/package/@w5s/task
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://github.com/w5s/project-config/blob/HEAD/packages/core/LICENSE
[issues-url]: https://github.com/w5s/std/issues
[sources-url]: git@github.com:w5s/std.git
[homepage-url]: https://github.com/w5s/std/tree/master/packages/std#readme
