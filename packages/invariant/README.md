# W5S Invariant _(@w5s/invariant)_

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=> ${description}&unknownTxt= ) -->
> Strict Typescript implementation of invariant
<!-- AUTO-GENERATED-CONTENT:END -->

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=```sh\nnpm install ${name}\n```) -->
```sh
npm install @w5s/invariant
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->
<!-- The below code snippet is automatically added from ./example/usage.ts -->
```ts
import { invariant } from '@w5s/invariant';

export function addTwo(value: unknown) {
  invariant(typeof value === 'number', `${String(value)} must be number`); // Throw error if first parameter is not true
  // value: boolean
  return value + 2;
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License

[MIT][license-url] © Julien Polo [julien.polo@gmail.com](mailto:julien.polo@gmail.com)

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->
[package-version-svg]: https://img.shields.io/npm/v/@w5s/invariant.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->
[package-url]: https://www.npmjs.com/package/@w5s/invariant
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
[license-url]: https://github.com/w5s/project-config/blob/HEAD/packages/invariant/LICENSE
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[issues-url]: ${bugs.url}) -->
[issues-url]: https://github.com/w5s/std/issues
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[sources-url]: ${repository.url}) -->
[sources-url]: git@github.com:w5s/std.git
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[homepage-url]: ${homepage}) -->
[homepage-url]: https://github.com/w5s/std/tree/master/packages/std#readme
<!-- AUTO-GENERATED-CONTENT:END -->
