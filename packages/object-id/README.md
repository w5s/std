<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=# W5S ${description} _(${name})_&unknownTxt= ) -->

# W5S Unique identifier of object-like values (object, symbol, function) _(@w5s/object-id)_

<!-- AUTO-GENERATED-CONTENT:END -->

[NPM Version][package-url]
[License][license-url]

This package can be used to generate a unique identifier (number) for an object / function / symbol. This kind of numeric identifier can be used to compute hash, generate debug trace, etc.

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKG_JSON:template=```sh\nnpm install ${name}\n```) -->

```sh
npm install @w5s/object-id
```

<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->

<!-- The below code snippet is automatically added from ./example/usage.ts -->

```ts
import { objectId } from '@w5s/object-id';

export function main(): void {
  const someObject = { foo: 1 };
  const id = objectId(someObject); // typeof id === 'number'
  console.log(id === objectId(someObject)); // true (because idempotent)
}
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

[package-version-svg]: https://img.shields.io/npm/v/@w5s/object-id.svg?style=flat-square
[package-url]: https://www.npmjs.com/package/@w5s/object-id
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://github.com/w5s/project-config/blob/HEAD/packages/uuid/LICENSE
