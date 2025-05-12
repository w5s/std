/**
 * A range is a sequence of elements that are contiguous in some way.
 *
 * @template T - The type of the elements in the range.
 */
export interface Range<T> extends Iterable<T> {
  /**
   * Start of range
   */
  readonly rangeStart: T;
  /**
   * End of range
   */
  readonly rangeEnd: T;
}
