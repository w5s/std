import type { Ordering } from './Ordering.js';
import { reverse } from './Order/reverse.js';
import { combine } from './Order/combine.js';
import { compareBy } from './Order/compareBy.js';
import { primitive } from './Order/primitive.js';

/**
 * Return an {@link Ordering} thats represents the comparison result
 *
 * @param left - left side operand
 * @param right - left side operand
 */
export type Order<T> = (left: T, right: T) => Ordering;

/**
 * @namespace
 */
export const Order = {
  compareBy,
  combine,
  primitive,
  reverse,
};
