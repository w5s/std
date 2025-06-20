import type { Ordering } from '../Ordering.js';

/**
 * An order function for {@link Primitive} values (i.e. boolean, bigint, number, string)
 *
 * @example
 * ```typescript
 * [1, 3, 2].toSorted(Order.primitive); // [1, 2, 3]
 * ['a', 'c', 'b'].toSorted(Order.primitive); // ['a', 'b', 'c']
 * ```
 * @param left - the left operand
 * @param right - the right operand
 */
export function primitive(left: boolean, right: boolean): Ordering;
export function primitive(left: bigint, right: bigint): Ordering;
export function primitive(left: number, right: number): Ordering;
export function primitive(left: string, right: string): Ordering;
export function primitive(left: any, right: any): Ordering {
  return left === right
    ? 0
    : // @ts-ignore workaround
      left < right
      ? -1
      : 1;
}
