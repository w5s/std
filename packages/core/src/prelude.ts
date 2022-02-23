/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable complexity */

import type { Spread } from './type.js';

/**
 * Return the unchanged given `value`
 *
 * @example
 * ```typescript
 * identity('foo');// 'foo'
 * ```
 * @param value the input and return value
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Return a function that will always return `value`
 *
 * @example
 * ```typescript
 * const constFoo = constant('foo');
 * constFoo();// 'foo'
 * ```
 * @param value the input and return value
 */
export function constant<T>(value: T): (anyValue?: unknown) => T {
  return () => value;
}

/**
 * Throw the given `error`. Often used as expression
 *
 * @example
 * ```typescript
 * const unknownValue: unknown = 123;
 * const stringValue = typeof unknownValue === 'string' ? unknownValue : throwError(new Error('not a string'));
 * ```
 * @param error the error to throw
 */
export function throwError(error: unknown): never {
  throw error;
}

/**
 * Type safe and immutable equivalent of `{ ...source, ...properties }`.
 * The return type is the same as `source` :
 * - `properties` cannot contain new property
 * - `properties` cannot change the type of a value
 *
 * @param source a base object
 * @param properties an extension object map
 */
export function assign<T>(source: T, properties: Partial<T> | undefined | null): T {
  return mergeObject(source, properties);
}

/**
 * Type safe and immutable equivalent of `{ ...source, ...extension }`.
 * The return type can change from `source` :
 * - `extension` can add new properties
 * - `extension` can override the type of `source`
 *
 * @param source a base object
 * @param extension an extension object map
 */
export function extend<T, Ext>(source: T, extension: Ext): Spread<T, Ext> {
  return mergeObject(source, extension);
}

/**
 * Pipe `value` to a sequence of function.
 *
 * @example
 * ```typescript
 * pipe(value).to();// value
 * pipe(value).to(f);// f(value) or value |> f
 * pipe(value).to(f, g);// g(f(value)) or value |> f |> g
 * // and so on...
 * ```
 * @param value the value to pass to the first function
 * @returns a { to } object
 */
export function pipe<Value>(value: Value): Pipe<Value> {
  return {
    to(
      ab?: Function,
      bc?: Function,
      cd?: Function,
      de?: Function,
      ef?: Function,
      fg?: Function,
      gh?: Function,
      hi?: Function,
      ij?: Function,
      jk?: Function,
      kl?: Function,
      lm?: Function,
      mn?: Function,
      no?: Function,
      op?: Function,
      pq?: Function,
      qr?: Function,
      rs?: Function,
      st?: Function
    ) {
      switch (arguments.length) {
        case 0:
          return value;
        case 1:
          return ab!(value);
        case 2:
          return bc!(ab!(value));
        case 3:
          return cd!(bc!(ab!(value)));
        case 4:
          return de!(cd!(bc!(ab!(value))));
        case 5:
          return ef!(de!(cd!(bc!(ab!(value)))));
        case 6:
          return fg!(ef!(de!(cd!(bc!(ab!(value))))));
        case 7:
          return gh!(fg!(ef!(de!(cd!(bc!(ab!(value)))))));
        case 8:
          return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value))))))));
        case 9:
          return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value)))))))));
        case 10:
          return jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value))))))))));
        case 11:
          return kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value)))))))))));
        case 12:
          return lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value))))))))))));
        case 13:
          return mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value)))))))))))));
        case 14:
          return no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value))))))))))))));
        case 15:
          return op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value)))))))))))))));
        case 16:
          return pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value))))))))))))))));
        case 17:
          return qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value)))))))))))))))));
        case 18:
          return rs!(qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value))))))))))))))))));
        case 19:
          return st!(rs!(qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(value)))))))))))))))))));
        default:
          throw new TypeError('Wrong arity');
      }
    },
  };
}

interface Pipe<A> {
  to(): A;
  to<B>(ab: (_: A) => B): B;
  to<B, C>(ab: (_: A) => B, bc: (_: B) => C): C;
  to<B, C, D>(ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D): D;
  to<B, C, D, E>(ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E): E;
  to<B, C, D, E, F>(ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E, ef: (_: E) => F): F;
  to<B, C, D, E, F, G>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G
  ): G;
  to<B, C, D, E, F, G, H>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H
  ): H;
  to<B, C, D, E, F, G, H, I>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I
  ): I;
  to<B, C, D, E, F, G, H, I, J>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J
  ): J;
  to<B, C, D, E, F, G, H, I, J, K>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K
  ): K;
  to<B, C, D, E, F, G, H, I, J, K, L>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L
  ): L;
  to<B, C, D, E, F, G, H, I, J, K, L, M>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M
  ): M;
  to<B, C, D, E, F, G, H, I, J, K, L, M, N>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N
  ): N;
  to<B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O
  ): O;
  to<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P
  ): P;
  to<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q
  ): Q;
  to<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R
  ): R;
  to<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R,
    rs: (_: R) => S
  ): S;
  to<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R,
    rs: (_: R) => S,
    st: (_: S) => T
  ): T;
}

function cloneObject<V>(source: V): V {
  return { ...source };
}

function mergeObject(source: any, properties: any): any {
  /* eslint-disable  @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */

  if (properties == null) {
    return source;
  }
  const keys = Object.keys(properties);
  const keyCount = keys.length;
  if (keyCount === 0) {
    return source;
  }
  const returnValue = cloneObject(source);
  let changed = false;
  let keyIndex = 0;
  // Try to copy until the first changed value is found
  while (keyIndex < keyCount) {
    const key = keys[keyIndex]!;
    const value = properties[key];
    if (returnValue[key] !== value) {
      changed = true;
      returnValue[key] = value;
      break;
    }
    keyIndex += 1;
  }
  // Fast Copy every other keys
  while (keyIndex < keyCount) {
    const key = keys[keyIndex]!;
    returnValue[key] = properties[key];
    keyIndex += 1;
  }

  return changed ? returnValue : source;
  /* eslint-enable  @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
}
