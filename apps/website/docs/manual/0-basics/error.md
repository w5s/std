---
sidebar_position: 4
---

# Error

## Motivation

## Usage

```ts
import { defineCustomError, type CustomError } from '@w5s/error';
import { Result } from '@w5s/core';

interface SomeError
  extends CustomError<{
    name: 'SomeError';
    customProperty: string;
  }> {}
const SomeError = defineCustomError<SomeError>('SomeError');

console.log(SomeError({
  message: 'This is a message',
  customProperty: 'custom',
  cause: new TypeError('This is the cause')
}));
// SomeError {
//   name: 'SomeError',
//   message: 'This is a message',
//   customProperty: 'custom',
//   cause: TypeError { message: 'This is the cause' }
// }
```

## Matching errors

The recommended way to match on errors created with `defineCustomError` is to use a `switch` / `case` on the error `name`

```ts
interface FooError
  extends CustomError<{
    name: 'FooError';
    fooProperty: boolean;
  }> {}
const FooError = defineCustomError<FooError>('FooError');

interface BarError
  extends CustomError<{
    name: 'BarError';
    barProperty: number;
  }> {}
const BarError = defineCustomError<BarError>('BarError');

function parse(): Result<string, FooError | BarError> {
  //...
}

function program() {
  const result = parse();
  if (Result.isError(result)) {
    switch (result.name) {
      case FooError.typeName: { 
        console.log('FooError:', error.fooProperty);
        break;
      }
      case BarError.typeName: { 
        console.log('BarError:', error.barProperty);
        break;
      }
      default: assertNever(result.name);
    }
  }
}

```

## Chaining / Specializing errors

`CustomError` can be used to create specific errors with a `cause` property that is useful to keep track of the chain of errors.

```ts
export interface CauseError
  extends CustomError<{
    name: 'CauseError';
  }> {}
export const CauseError = defineCustomError<CauseError>('CauseError');

try {
  // ...
} catch (error) {
  throw CauseError({
    message: 'This is a better error',
    cause: error,
  });
}
```

## Coding Guide

## FAQ
