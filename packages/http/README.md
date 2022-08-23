<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=# W5s HTTP Module _(${name})_) -->
# W5s HTTP Module _(@w5s/http)_
<!-- AUTO-GENERATED-CONTENT:END -->

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=> ${description}&unknownTxt= ) -->
> HTTP module
<!-- AUTO-GENERATED-CONTENT:END -->

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=```console\nnpm install ${name}\n```) -->
```console
npm install @w5s/http
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->
<!-- The below code snippet is automatically added from ./example/usage.ts -->
```ts
import { HTTP, HTTPError, parseJSON } from '@w5s/http';
import { Console, Task, assertNever } from '@w5s/core';

const getText = (id: number) => ({
  url: `http://localhost/${id}`,
  parse: parseJSON<{ foo: boolean }>('unsafe'),
});

export function program() {
  const task = HTTP.request(getText(123));
  const log = Task.andThen(task, (response) => Console.debug(response.foo));
  const handled = Task.orElse(log, (error) => {
    switch (error.name) {
      case HTTPError.InvalidURL.errorName:
        return Console.error(`A wrong url was passed. Got ${error.input}`);
      case HTTPError.NetworkError.errorName:
        return Console.error('A network error occurred');
      case HTTPError.ParserError.errorName:
        return Console.error('A parser error occurred');
      default:
        return assertNever(error);
    }
  });

  return handled;
}

Task.unsafeRun(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[${license}][license-url] © ${author}) -->
[MIT][license-url] © Julien Polo <julien.polo@gmail.com>
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->
[package-version-svg]: https://img.shields.io/npm/v/@w5s/http.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->
[package-url]: https://www.npmjs.com/package/@w5s/http
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
[license-url]: ../../LICENSE
