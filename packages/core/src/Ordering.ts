import { reverse } from './Ordering/reverse.js';
import { Ordering as OrderingType } from './Type/Ordering.js';

/**
 * Ordering type
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
