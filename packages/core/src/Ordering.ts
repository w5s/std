import { reverse } from './Ordering/reverse.js';
import { Ordering as OrderingType } from './Type/Ordering.js';

/**
 * Integer value
 *
 * Alias of {@link @w5s/core!Type.Int}
 */
export type Ordering = OrderingType;

/**
 * A collection of functions to manipulate ordering values
 *
 * @namespace
 */
export const Ordering = {
  ...OrderingType,
  reverse,
};
