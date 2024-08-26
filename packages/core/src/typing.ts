/**
 * An empty object
 */
export type EmptyObject = Record<string | symbol, never>;

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

/**
 * Number formatting radix
 */
export type Radix36 =
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36;
