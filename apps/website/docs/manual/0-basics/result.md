---
sidebar_position: 3
---

# Result

> Error handling in a type safe way

## Motivation

A `Result<Value, Error>` is a type to manipulate and propagate errors in a type safe way (like Rust result or Haskell Either).
It can be represented as a tagged union `{ _: 'Ok', value: Value } | { _: 'Error', error: Error }`.

Historically, Javascript programs tends to throw errors. But this practice have the following drawbacks :

- Runtime crash (ex: accessing a property of `undefined`) and custom business errors (ex: the API returned an error) are mixed and are both caught with try/catch.
- Caught errors have always an `unknown` type, they are hard to handle in a type safe way
- Developers are not aware that they should handle some error cases, as it is not represented in the type system (ex: division by zero)

On the contrary, `Result` have the following capabilities :

- Developer must handle `Ok`/`Error` case to be able to use the `value` or `error`
- All error cases can be represented using a union type `Result<V, E1|E2|E3>`
- Runtime crashes follow a complete different path, and therefore can be handled in a proper way (stop the program, log in a crash reporter, etc)

## Usage

An enum can be declared as the following example :

```ts
import { Result } from '@w5s/core';
import { defineCustomError, type CustomError } from '@w5s/error';

export interface ZeroDivisionError
  extends CustomError<{
    name: 'ZeroDivisionError';
  }> {}
export const ZeroDivisionError = defineCustomError<ZeroDivisionError>('ZeroDivisionError');

export function divide(value: number, divider: number): Result<number, ZeroDivisionError> {
  const returnValue = value / divider;
  return Number.isNaN(returnValue) ? Result.Error(ZeroDivisionError()) : Result.Ok(returnValue);
}
```

## Chaining

Use `Result.map` and/or `Result.andThen` to transform `Ok` value

### Using pipeline operator (*Draft proposal*)

```ts
function program(expression: string) {
  // Convert string to number
  return parseNumber(expression) // Result<number, ParseError>
    // Divide by 2
    |> Result.andThen(#, (_) => divide(10, 2)) // Result<number, ZeroDivisionError | ParseError>
    // Multiple by 3
    |> Result.map(#, (_) => _ * 3); // Result<number, ZeroDivisionError | ParseError>
}
```

### Using `const`

```ts
function program(expression: string) {
  // Convert string to number
  const parsed = parseNumber(expression); // Result<number, ParseError>
  // Divide by 2
  const dividedBy2 = divide(parsed, 2); // Result<number, ZeroDivisionError | ParseError>
  // Multiple by 3
  const multipliedBy3 = Result.map(dividedBy2, (_) => _ * 3); // Result<number, ZeroDivisionError | ParseError>
  return multipliedBy3;
}
```

## Handling error

Use `Result.mapError` and/or `Result.orElse` to transform `Error` error.

```ts
const handleZeroDivisionError = <E>(result: Result<number, E|ZeroDivisionError>) => {
  return Result.orElse(result, (error) => {
    switch (error.name): {
      case ZeroDivisionError.typeName: return Result.Ok(0);
      default: Result.Error(error);
    }
  });// Result<number, E>
};
```

## Coding Guide

:::tip

### Always use `Result` when possible

- Prefer using `Result` over throwing error.
- Prefer using `Result` over returning `Option` for a non representable value
- When throwing error prefer using `import { invariant } from '@w5s/invariant'`

:::

## FAQ

<details>
<summary>
Why choose the name `Result` over `Either` ?
</summary>

It is a matter of preference. `Ok` / `Error` is more explicit than `Left` / `Right`.
Generally speaking, `W5S` packages naming tends to be often aligned with the `Rust` naming when no ECMA equivalent exists.
</details>
