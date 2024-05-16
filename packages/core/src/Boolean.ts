import { BooleanComparable } from './Boolean/BooleanComparable.js';
import { Boolean as BooleanType } from './Type/Boolean.js';

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
};
