/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Spread } from './typing.js';

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

function mergeObject(source: any, extension: any): any {
  /* eslint-disable  @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */

  if (extension == null) {
    return source;
  }
  const keys = Object.keys(extension);
  const keyCount = keys.length;
  if (keyCount === 0) {
    return source;
  }
  // clone source
  const returnValue = { ...source };
  let changed = false;
  let keyIndex = 0;
  // Try to copy until the first changed value is found
  while (keyIndex < keyCount) {
    const key = keys[keyIndex]!;
    const value = extension[key];
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
    returnValue[key] = extension[key];
    keyIndex += 1;
  }

  return changed ? returnValue : source;
  /* eslint-enable  @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
}
