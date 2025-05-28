/**
 * Module interface for the unary `!` operator
 */
export interface Not<Self, Output = Self> {
  /**
   * Performs the equivalent of the `!` operation.
   *
   * @example
   * ```typescript
   * type Answer = 'yes' | 'no';
   *
   * const Answer: Not<Answer> = {
   *   not(self) => self === 'yes' ? 'no' : 'yes',
   * };
   *
   * Answer.not('yes') // 'no'
   * Answer.not('no') // 'yes'
   * ```
   *
   * @param self - The value to negate.
   */
  not(self: Self): Output;
}
