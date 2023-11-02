---
sidebar_position: 1
---

# Introduction

## Why another standard library ?

`@w5s/std` is a collection of packages for strictly typed functional programming in TypeScript.
It focuses on strong typing, immutability, simplicity and restricted set of functionalities.
Advanced functional programming patterns and immutability should not be used if it degrades significantly type safety and simplicity.

Summary :

|                               | Balance |                                 |
|-----------------------------: | :-----: | :-------------------------------|
| Loose typing                  | □□□□□□■ | Strong typing                   |
| Impure, Mutable               | □□□□□■□ | Pure, Immutable                 |
| Simple Functional Programming | □□■□□□□ | Advanced Functional Programming |
| Lean API                      | □□■□□□□ | Complete API                    |

## Comparison with other libraries

### fp-ts

Pros:

- Complete and Standardized API
- Strict typing
- If you love FP, you will feel at home (Monads, Monoids, Semi-group)

Cons:

- Too many functions (sometimes lack of documentation, examples)
- Trying to look like Haskell without operators and compiler leads to a weird JS syntax, hard to understand
- If you do not know FP, learning curve is steep

Summary :

|                               | Balance |                                 |
|-----------------------------: | :-----: | :-------------------------------|
| Loose typing                  | □□□□□□■ | Strong typing                   |
| Impure, Mutable               | □□□□□□■ | Pure, Immutable                 |
| Simple Functional Programming | □□□□□□■ | Advanced Functional Programming |
| Lean API                      | □□□□□□■ | Complete API                    |

### Ramda

Pros:

- Complete and Standardized API
- Nice learning curve
- Currying

Cons:

- Does not always play well with Typescript

Summary :
|                               | Balance |                                 |
|-----------------------------: | :-----: | :-------------------------------|
| Loose typing                  | □■□□□□□ | Strong typing                   |
| Impure, Mutable               | □□□□■□□ | Pure, Immutable                 |
| Simple Functional Programming | □□□□■□□ | Advanced Functional Programming |
| Lean API                      | □□□■□□□ | Complete API                    |
