<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5S ${description} _(${name})_&unknownTxt= ) -->
# W5S Number, BigInt, Int modules _(@w5s/num)_
<!-- AUTO-GENERATED-CONTENT:END -->

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=```sh\nnpm install ${name}\n```) -->
```sh
npm install @w5s/num
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->
<!-- The below code snippet is automatically added from ./example/usage.ts -->
```ts
import { Option } from '@w5s/core';
import { BigInt } from '@w5s/num';

export function main() {
  const expressions = ['1n', '2n', 'foo'];
  for (const expression of expressions) {
    const valueOption = BigInt.parse(expression);
    if (Option.isSome(valueOption)) {
      console.log(BigInt['!='](valueOption, 1n));
    } else {
      console.error('Failed to parse the expression');
    }
  }
  // Will output
  // > true
  // > false
  // !> Failed to parse the expression
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License

[MIT][license-url] © Julien Polo [julien.polo@gmail.com](mailto:julien.polo@gmail.com)

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->
[package-version-svg]: https://img.shields.io/npm/v/@w5s/num.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->
[package-url]: https://www.npmjs.com/package/@w5s/num
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
[license-url]: https://github.com/w5s/project-config/blob/HEAD/packages/time/LICENSE
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[issues-url]: ${bugs.url}) -->
[issues-url]: https://github.com/w5s/std/issues
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[sources-url]: ${repository.url}) -->
[sources-url]: git@github.com:w5s/std.git
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=[homepage-url]: ${homepage}) -->
[homepage-url]: https://github.com/w5s/std/tree/master/packages/std#readme
<!-- AUTO-GENERATED-CONTENT:END -->
