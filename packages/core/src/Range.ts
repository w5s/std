/**
 * A range is a sequence of elements that are contiguous in some way.
 *
 * @template T - The type of the elements in the range.
 */
export interface Range<T> extends Iterable<T> {
  /**
   * End of range
   */
  readonly rangeEnd: T;

  /**
   * Start of range
   */
  readonly rangeStart: T;
}
