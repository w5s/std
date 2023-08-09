import { extend } from './extend.js';

/**
 * Type safe and immutable equivalent of `{ ...source, ...properties }`.
 * The return type is the same as `source` :
 * - `properties` cannot contain new property
 * - `properties` cannot change the type of a value
 *
 * @example
 * ```typescript
 * const base = { a: 1 }
 * const newObject = assign(base, { a: 2 });// { a: 2 }
 * ```
 * @param source - a base object
 * @param properties - an extension object map
 */
export function assign<T>(source: T, properties: Partial<T> | undefined | null): T {
  // @ts-ignore extends has a different typing but does the same thing
  return extend(source, properties);
}
