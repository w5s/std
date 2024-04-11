import type { Type } from './Type.js';
import { Comparable } from './Comparable.js';

const BooleanComparable = Comparable<boolean>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

const BooleanType: Type<boolean> = {
  typeName: 'Boolean',
  hasInstance(anyValue: unknown): anyValue is boolean {
    return typeof anyValue === 'boolean';
  },
};

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
