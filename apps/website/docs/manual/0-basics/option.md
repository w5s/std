---
sidebar_position: 2
---

# Option

## Motivation

An `Option<V>` is either a value of type `V` or nothing. An empty value is represented by `Option.None` and a defined value by `Option.Some(...)`. Internally, `Option.None` is `undefined`.

## Usage

An enum can be declared as the following example :

```js
import { Option } from '@w5s/core';

export type OptString = Option<string>;

const withSuffix = (opt: OptString) => Option.map(opt, (_) => `${_}_suffix`);
withSuffix(Option.Some('foo')); // Option.Some('foo_suffix')
withSuffix(Option.None); // Option.None

const withFallback = (opt: OptString) => Option.orElse(opt, () => 'fallback');
withFallback(Option.Some('foo')); // Option.Some('foo')
withFallback(Option.None);// Option.None
```



## Matching on values

### `Option.isNone` / `Option.isSome` (Recommended)

:::info

Offers the best readability with expressiveness, with high performances

:::

```ts
import { Option } from '@w5s/core';

const optionToString = <V>(option: Option<V>) => Option.isSome(option) ? `Some(${v})` : 'None');
optionToString(Option.Some(1));// 'Some(1)'
optionToString(Option.None);// 'None'
```

### `Option.match`

:::info

Offers a good readability with expressiveness, with a small tradeoff on performances (object and function creation)

:::

```ts
import { Option } from '@w5s/core';

const optionToString = <V>(option: Option<V>) => Option.match(option, {
    Some: (v) => `Some(${v})`,
    None: () => 'None',
});
optionToString(Option.Some(1));// 'Some(1)'
optionToString(Option.None);// 'None'
```

### `=== undefined` / `!== undefined` (i.e. inlining isNone / isSome)

:::info

At the cost of a mediocre expressiveness, this solution is the best for performances because the Option module does not have to be loaded (it is a type only dependency).
Not recommended for an application, but only for a third party library.

:::

```ts
import type { Option } from '@w5s/core';

const optionToString = <V>(option: Option<V>) => option === undefined ? `Some(${v})` : 'None';
```

## Coding Guide

:::tip

### 1. Use idiomatic functions

- Prefer `Option.map` / `Option.andThen` /  `Option.orElse` when mapping an `Option` to an `Option`
- Prefer ternary operators over `if` / `else`

```ts
// ✓ OK
const myFunc = <V>(option: Option<V>) => Option.map(option, () => /* ... */);

// = OK with caution
const myFunc = <V>(option: Option<V>) => Option.isNone(option) ? /* ... */ : /* ... */;
// ⚠️ Be careful to return the same type in both cases

// ⤫ BAD
const myFunc = <V>(option: Option<V>) => {
    if (Option.isNone(option)) {
        return /* ... */ // Risk of returning a different type on both branches
    }
    return /* ... */
};
```
:::

:::tip

### 2. Try to eliminate `null` when possible

```ts
// ✓ GOOD
const someOptionFunc = () => Option.from(someNullableFunc()); // null -> undefined
```

:::

## FAQ

<details>
<summary>
Why choose `undefined` instead of `null` or a variant object (like `fp-ts`) ?
</summary>

**SOLUTION 1 : Tagged variant `{ _: 'None' } | { _: 'Some', value, }` :**

PROS :

- Generic pattern matching

CONS :

- Creates a third "nullable" representation after `null` and `undefined`
- Every access to a propery or array would have to be converted from `undefined` or `null` to `None|Some()`

**SOLUTION 2 : `null` as `None` :**

PROS :

- JSON friendly

CONS :

- `typeof null == 'object'``
- Every access to a propery or array would have to be converted from `undefined` to `null`

**SOLUTION 3 : `undefined` as `None` :**

PROS :

- array and property access are already well typed
- `typeof undefined == 'undefined'`

CONS :

- `undefined` does not exist in JSON

</details>
