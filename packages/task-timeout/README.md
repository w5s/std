<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5S ${description} _(${name})_&unknownTxt= ) -->

# W5S Task timeout modules _(@w5s/task-timeout)_

<!-- AUTO-GENERATED-CONTENT:END -->

[NPM Version][package-url]
[License][license-url]

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=```sh\nnpm install ${name}\n```) -->

```sh
npm install @w5s/task-timeout
```

<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

### Example

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->

<!-- The below code snippet is automatically added from ./example/usage.ts -->

```ts
import { Task } from '@w5s/task';
import { timeout } from '@w5s/task-timeout';
import { TimeDuration } from '@w5s/time';

function sayHelloWorld(delay: TimeDuration) {
  return Task.from(({ resolve, canceler }) => {
    const timerId = setTimeout(() => {
      console.log('Hello World!');
      resolve(undefined);
    }, delay);
    canceler.addEventListener('abort', () => clearTimeout(timerId));
  });
}

export function main() {
  // Example of a task that will
  const someTask = sayHelloWorld(TimeDuration({ seconds: 2 })); // log "Hello world" after 2 seconds
  const withTimeout = timeout(someTask, TimeDuration({ seconds: 1 })); // set timeout to 1 second

  return withTimeout;
}

void Task.run(main());
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

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-url]: https://www.npmjs.com/package/${name}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[issues-url]: ${bugs.url}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[sources-url]: ${repository.url}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[homepage-url]: ${homepage}) -->

<!-- AUTO-GENERATED-CONTENT:END -->

[package-version-svg]: https://img.shields.io/npm/v/@w5s/task-timeout.svg?style=flat-square
[package-url]: https://www.npmjs.com/package/@w5s/task-timeout
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://www.npmjs.com/package/@w5s/task-timeout
[issues-url]: https://github.com/w5s/std/issues
[sources-url]: git@github.com:w5s/std.git
[homepage-url]: https://github.com/w5s/std/tree/master/packages/std#readme
