import type { Enum } from '../Enum.js';
import { define } from '../Enum/define.js';

/**
 * An Ordering is the result of a comparison between two values.
 */
export const Ordering = define({
  typeName: 'Ordering',
  /**
   * An ordering where a compared value is less than another.
   */
  Less: -1,
  /**
   * An ordering where a compared value is equal to another.
   */
  Equal: 0,
  /**
   * An ordering where a compared value is greater than another.
   */
  Greater: 1,
});
export type Ordering = Enum.ValueOf<typeof Ordering>;
