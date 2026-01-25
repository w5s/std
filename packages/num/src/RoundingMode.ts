import { Enum } from '@w5s/core';

export const RoundingMode = Enum.define({
  typeName: 'RoundingMode',
  /**
   * Always round away from zero
   *
   * @example
   * 5.5 → 6.0
   * 2.5 → 3.0
   * 1.6 → 2.0
   * 1.1 → 2.0
   * -1.1 → -2.0
   * -1.6 → -2.0
   * -2.5 → -3.0
   * -5.5 → -6.0
   */
  Expand: 'expand',
  /**
   * Always round towards zero
   *
   * @example
   * 5.5 → 5.0
   * 2.5 → 2.0
   * 1.6 → 1.0
   * 1.1 → 1.0
   * -1.1 → -1.0
   * -1.6 → -1.0
   * -2.5 → -2.0
   * -5.5 → -5.0
   */
  Trunc: 'trunc',
  /**
   * Towards +∞
   *
   * @example
   * 5.5 → 6.0
   * 2.5 → 3.0
   * 1.6 → 2.0
   * 1.1 → 2.0
   * -1.1 → -1.0
   * -1.6 → -1.0
   * -2.5 → -2.0
   * -5.5 → -5.0
   */
  Ceil: 'ceil',
  /**
   * Towards -∞
   *
   * @example
   * 5.5 → 5.0
   * 2.5 → 2.0
   * 1.6 → 1.0
   * 1.1 → 1.0
   * -1.1 → -2.0
   * -1.6 → -2.0
   * -2.5 → -3.0
   * -5.5 → -6.0
   */
  Floor: 'floor',
  /**
   * Round to ‘nearest neighbor’, or up if ending decimal is 5
   *
   * @example
   * 5.5 → 6.0
   * 2.5 → 3.0
   * 1.6 → 2.0
   * 1.1 → 1.0
   * -1.1 → -1.0
   * -1.6 → -2.0
   * -2.5 → -3.0
   * -5.5 → -6.0
   */
  HalfExpand: 'halfExpand',
  /**
   * Round to ‘nearest neighbor’, or down if ending decimal is 5
   *
   * @example
   * 5.5 → 5.0
   * 2.5 → 2.0
   * 1.6 → 2.0
   * 1.1 → 1.0
   * -1.1 → -1.0
   * -1.6 → -2.0
   * -2.5 → -2.0
   * -5.5 → -5.0
   */
  HalfTrunc: 'halfTrunc',
  /**
   * Round to ‘nearest neighbor’, if equidistant, round towards nearest even digit
   *
   * @example
   * 5.5 → 6.0
   * 2.5 → 2.0
   * 1.6 → 2.0
   * 1.1 → 1.0
   * -1.1 → -1.0
   * -1.6 → -2.0
   * -2.5 → -2.0
   * -5.5 → -6.0
   */
  HalfEven: 'halfEven',
  /**
   * Round to ‘nearest neighbor’, or towards +∞ if ending decimal is 5
   *
   * @example
   * 5.5 → 6.0
   * 2.5 → 3.0
   * 1.6 → 2.0
   * 1.1 → 1.0
   * -1.1 → -1.0
   * -1.6 → -2.0
   * -2.5 → -2.0
   * -5.5 → -5.0
   */
  HalfCeil: 'halfCeil',
  /**
   * Round to ‘nearest neighbor’, or towards -∞ if ending decimal is 5
   *
   * @example
   * 5.5 → 5.0
   * 2.5 → 2.0
   * 1.6 → 2.0
   * 1.1 → 1.0
   * -1.1 → -1.0
   * -1.6 → -2.0
   * -2.5 → -3.0
   * -5.5 → -6.0
   */
  HalfFloor: 'halfFloor',
});
export type RoundingMode = Enum.ValueOf<typeof RoundingMode>;
