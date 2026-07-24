import type { Enum } from '../Enum.js';

import { define } from '../Enum/define.js';

/**
 * An Ordering is the result of a comparison between two values.
 */
export const Ordering = define({
  /**
   * An ordering where a compared value is equal to another.
   */
  Equal: 0,

  /**
   * An ordering where a compared value is greater than another.
   */
  Greater: 1,

  /**
   * An ordering where a compared value is less than another.
   */
  Less: -1,

  typeName: 'Ordering',
});
export type Ordering = Enum.ValueOf<typeof Ordering>;
