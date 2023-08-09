/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Spread } from './type.js';

/**
 * Always return `undefined` and ignore passed value
 *
 * @example
 * ```typescript
 * const doSomething = () => 'foo
 * const doSomethingIgnore = () => ignore(doSomething());// undefined
 * ```
 * @param _anyValue - any value that should be ignored
 */
export function ignore(_anyValue: unknown): void {}

/**
 * Return the unchanged given `value`
 *
 * @example
 * ```typescript
 * identity('foo');// 'foo'
 * ```
 * @param value - the input and return value
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
 * @param value - the input and return value
 */
export function constant<T>(value: T): (anyValue?: unknown) => T {
  return () => value;
}

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
  return mergeObject(source, properties);
}

/**
 * Type safe and immutable equivalent of `{ ...source, ...extension }`.
 * The return type can change from `source` :
 * - `extension` can add new properties
 * - `extension` can override the type of `source`
 *
 * @example
 * ```typescript
 * const base = { a: 1 }
 * const newObject = assign(base, { b: 3 });// { a: 2, b: 3 }
 * ```
 * @param source - a base object
 * @param extension - an extension object map
 */
export function extend<T, Ext>(source: T, extension: Ext): Spread<T, Ext> {
  return mergeObject(source, extension);
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
