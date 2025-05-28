import { BooleanComparable } from './Boolean/BooleanComparable.js';
import { BooleanNot } from './Boolean/BooleanNot.js';
import { boolean as BooleanType } from './Type/boolean.js';

/**
 * A collection of functions to manipulate `boolean`
 *
 * @example
 * ```typescript
 * import { Boolean } from '@w5s/core';
 *
 * if (Boolean.hasInstance(unknownValue)) {
 *   // typeof unknownValue === 'boolean'
 * }
 * ```
 * @namespace
 */
export const Boolean = {
  ...BooleanType,
  ...BooleanComparable,
  ...BooleanNot,
};
