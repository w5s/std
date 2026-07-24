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
  SpreadProperties<L, R, keyof L & OptionalPropertyNames<R>>
>;

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type OptionalPropertyNames<T> = { [K in keyof T]-?: {} extends Record<K, T[K]> ? K : never }[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: Exclude<R[P], undefined> | L[P] };
