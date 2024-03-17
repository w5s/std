---
sidebar_position: 6
---

# Int

> A tagged type to represent integer values

## Motivation

There is no `int` in `ES` only `number`. Nevertheless, there is a notion of [Safe Integer](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) which represent an integer value in the range -2^53 to (2^53)-1, without any precision loss.
`Int` is a `Tag` type that helps to validate at compile time that the value is a "safe integer".

## Usage

```ts
import { Int } from '@w5s/core'

const one = Int.of(1);
const two = Int.of(2);
const three = Int['+'](one, two); // 3
```

## Coding Guide

:::tip

### Prefer `Int` when type safety is more important that performance

- `Int` functions are designed to perform integer operations in a type safe way and represent explicitely all possible errors (parsing errors, division by zero, etc)
- `Int` functions will never have better performance than inline regular number operation

:::

## FAQ

