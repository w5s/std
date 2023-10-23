<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5s Invariant _(${name})_) -->
# W5s Invariant _(@w5s/invariant)_
<!-- AUTO-GENERATED-CONTENT:END -->

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=> ${description}&unknownTxt= ) -->
> Strict Typescript implementation of invariant
<!-- AUTO-GENERATED-CONTENT:END -->
## About the project

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
  invariant(typeof value === 'number', `${String(value)} must be number`);

  return value + 2;
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[${license}][license-url] © ${author}) -->
[MIT][license-url] © Julien Polo <julien.polo@gmail.com>
<!-- AUTO-GENERATED-CONTENT:END -->

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
[license-url]: ../../LICENSE
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[issues-url]: ${bugs.url}) -->
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[sources-url]: ${repository.url}) -->
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[homepage-url]: ${homepage}) -->
<!-- AUTO-GENERATED-CONTENT:END -->
