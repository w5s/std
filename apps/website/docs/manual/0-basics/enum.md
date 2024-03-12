---
sidebar_position: 1
---

# Enum

## Motivation

Enums are useful for defining types that can only take on a limited set of values.

## Declare an Enum

An enum can be declared as the following example :

```ts
export const MyEnumType = {
    Foo: 'foo',
    Bar: 'bar',
};
export type MyEnumType = typeof MyEnumType[keyof typeof MyEnumType];
```

## Matching on values

```ts
import { assertNever } from '@w5s/invariant';

export function getName(value: MyEnumType) {
    switch (value) {
        case MyEnumType.Foo:
            return 'foo_name';
        case MyEnumType.Bar:
            return 'bar_name';
        default:
            assertNever(value);
}
```

## Coding Guide

```ts
// ✓ Export a const
// ✓ PascalCase
export const {{EnumType}} = {
    // ✓ PascalCase
    {{EnumValueName}}: '{{EnumValue}}',
    // ...
};
// ✓ Export a type with the same name as the const
export type {{EnumType}} = typeof {{EnumType}}[keyof typeof {{EnumType}}];
```
