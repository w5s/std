<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5S ${description} _(${name})_&unknownTxt= ) -->
# W5S HTTP client module _(@w5s/http)_
<!-- AUTO-GENERATED-CONTENT:END -->

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]


## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=```console\nnpm install ${name}\n```) -->
```console
npm install @w5s/http
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->
<!-- The below code snippet is automatically added from ./example/usage.ts -->
```ts
import { requestSend, HTTPError, ResponseParser, Client } from '@w5s/http';
import { Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { TimeoutError } from '@w5s/error';

const client = Client();
const getText = (id: number) => ({
  url: `http://localhost/${id}`,
});
const FooObject = Type.Object({
  foo: Type.boolean,
});

declare function logDebug(message: unknown): Task<void, never>;
declare function logError(message: unknown): Task<void, never>;

export function program() {
  const responseTask = requestSend(client, getText(123));
  const parsed = Task.andThen(responseTask, ResponseParser.json(FooObject));
  const log = Task.andThen(parsed, (response) => logDebug(response.foo));
  const handled = Task.orElse(log, (error) => {
    switch (error.name) {
      case HTTPError.InvalidURL.errorName: {
        return logError(`A wrong url was passed. Got ${error.input}`);
      }
      case HTTPError.NetworkError.errorName: {
        return logError('A network error occurred');
      }
      case HTTPError.ParserError.errorName: {
        return logError('A parser error occurred');
      }
      case TimeoutError.errorName: {
        return logError('Operation timed out');
      }
      default: {
        return logError('Unknown');
      }
    }
  });

  return handled;
}

Task.run(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License

[MIT][license-url] © Julien Polo [julien.polo@gmail.com](mailto:julien.polo@gmail.com)

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->
[package-version-svg]: https://img.shields.io/npm/v/@w5s/http.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->
[package-url]: https://www.npmjs.com/package/@w5s/http
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-url]: https://www.npmjs.com/package/${name}) -->
[license-url]: https://www.npmjs.com/package/@w5s/http
<!-- AUTO-GENERATED-CONTENT:END -->

