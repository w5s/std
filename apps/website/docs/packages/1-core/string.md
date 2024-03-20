---
sidebar_position: 6
---

# String

> Lightweight namespace for string manipulation

## Motivation

`globalThis.String` functions and methods are very useful but has the following drawbacks :

- Most functions are on the `prototype`
  - Since ESM, it creates a double syntax standard `toDashCase(string)` VS `myString.toLowerCase()`
  - `String.prototype` should never be extended
- Some legacy design decisions
  - `indexOf`, `lastIndexOf` returns `-1` when not found

`String` namespace corrects these problems in a pragmatic way :

- Extendable : as an object `String` can be extends with a simple `{ ...String, myMethod() {} }`
- Uniform : every `String` function has a string as first parameter
- Expressive : `indexOf` and `lastIndexOf` returns `Option<Int>`

## Usage

```ts
import { String, Option, Int } from '@w5s/core';

const baseName = (path: string): Option<string> => {
  const positionOption = String.lastIndexOf(expression, '/'); // Option<Int>;
  const afterLastSlash = Option.match(positionOption, (position) => 
    None: () => path, // unchanged when not found
    Some: (position) => String.slice(path, position + 1), // everything after the last slash
  );
  return afterLastSlash;
}
```

## Coding Guide

:::tip

### Prefer `String` functions over `globalThis.String`

- At best `String` will provide polyfill / better performance / better type safety
- At worst `String` will call the native function

:::

## FAQ
