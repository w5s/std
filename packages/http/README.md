# W5S HTTP Module _(@w5s/http)_

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=> ${description}&unknownTxt= ) -->
> HTTP client module
<!-- AUTO-GENERATED-CONTENT:END -->

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
import { HTTP, HTTPError, HTTPParser } from '@w5s/http';
import { Console, Task, unsafeRun } from '@w5s/core';

const getText = (id: number) => ({
  url: `http://localhost/${id}`,
  parse: HTTPParser.json<{ foo: boolean }>('unsafe'),
});

export function program() {
  const task = HTTP.request(getText(123));
  const log = Task.andThen(task, (response) => Console.debug(response.foo));
  const handled = Task.orElse(log, (error) => {
    switch (error.name) {
      case HTTPError.InvalidURL.errorName: {
        return Console.error(`A wrong url was passed. Got ${error.input}`);
      }
      case HTTPError.NetworkError.errorName: {
        return Console.error('A network error occurred');
      }
      case HTTPError.ParserError.errorName: {
        return Console.error('A parser error occurred');
      }
      default: {
        return Console.error('Unknown');
      }
    }
  });

  return handled;
}

unsafeRun(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
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
[license-url]: https://github.com/w5s/project-config/blob/HEAD/packages/http/LICENSE
