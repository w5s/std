/* eslint-disable @typescript-eslint/ban-types */

/**
 * Type for something that can be used with `await`.
 * It can be either `T` or `Promise<T>`
 *
 * @see https://stackoverflow.com/a/56129545
 */
export type Awaitable<T> = T | PromiseLike<T>;

/**
 * Enhance `Base` by adding tags. Every tag is prefixed by @@ as a convention to never be used by runtime code
 *
 * @example
 * ```typescript
 * type PositiveNumber = Tag<number, { positive: true }>;
 * const isPositive = (n: number): n is PositiveNumber => n >= 0;
 * const squareRoot = (n: PositiveNumber): PositiveNumber => Math.sqrt(n) as PositiveNumber;
 * const value = 0;
 * squareRoot(value); // tsc: Error
 * if (isPositive(value)) {
 *   squareRoot(value); // tsc: Passed
 * }
 * ```
 */
export type Tag<Base, TagRecord> = Base & { readonly [K in keyof TagRecord & string as `@@${K}`]: TagRecord[K] };

/**
 * Typing for `{ ...A, ...B, ...C, ... }`
 *
 * @example
 * ```typescript
 * type A = { overridden: boolean, a: string  };
 * type B = { overridden: number, b: string  };
 * type C = { c: number  };
 * type ABC = Spread<[A, B, C]>;// { overridden: number, a: string, b: string, c: number }
 * ```
 */
// FIXME: removed because of circular dependency issus
// export type SpreadN<Types extends readonly [...any]> = Types extends [infer L, ...infer R]
//   ? Spread<L, SpreadN<R>>
//   : unknown;

type OptionalPropertyNames<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never }[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> };

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/**
 * Typing for `{ ...A, ...B }`
 *
 * @example
 * ```typescript
 * type A = { overridden: boolean, a: string  };
 * type B = { overridden: number, b: string  };
 * type AB = Spread<A, B>;// { overridden: number, a: string, b: string }
 * ```
 */
export type Spread<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;
