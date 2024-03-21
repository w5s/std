---
sidebar_position: 1
---

# Enum

> Enumeration of constant values

## Motivation

Enums are useful for defining types that can only take on a limited set of values.

## Define an Enum

An enum can be declared as the following example :

```ts
import { Enum } from '@w5s/core';

export const MyEnum = Enum.Make({
  Foo: 'foo',
  Bar: 'bar',
});
export type MyEnum = Enum.ValueOf<typeof MyEnum>;
```

## Matching on values

```ts
import { assertNever } from '@w5s/invariant';

export function getName(value: MyEnum) {
  switch (value) {
    case MyEnum.Foo:
      return 'foo_name';
    case MyEnum.Bar:
      return 'bar_name';
    default:
      assertNever(value);// Exhaustive check
  }
}
```

## Keys & Values

To read enum keys and values, use `Enum.keys` and `Enum.values` :

```ts
export const MyEnum = Enum.Make({
  Foo: 'foo',
  Bar: 'bar',
});

Enum.keys(MyEnum); // ['Foo', 'Bar']
Enum.values(MyEnum); // ['foo', 'bar']
```

## Extending Enum

Extending an enum can be done just using the `...` operator

```ts
const MyEnumValues = Enum.Make({
  Foo: 'foo',
  Bar: 'bar',
});

export type MyEnum = Enum.ValueOf<typeof MyEnumValues>;

export const MyEnum = {
  ...MyEnumValues,
  someMethod(value: MyEnum | undefined) {
    switch (value) {
      case 'foo': return 'foo_label';
      case 'bar': return 'bar_label';
      default: return '';
    }
  }
}

// Enum.keys(MyEnum) will still return ['Foo', 'Bar'] !
```


## Coding Guide

```ts
// ✓ Export a const
// ✓ PascalCase
export const {{EnumType}} = Enum.Make({
  // ✓ PascalCase
  {{EnumValueName}}: '{{EnumValue}}',
  // ...
});
// ✓ Export a type with the same name as the const
export type {{EnumType}} = Enum.ValueOf<typeof {{EnumType}}>;
```
