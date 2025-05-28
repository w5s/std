export interface Negate<T, Return = T> {
  /**
   * Negates the given value.
   *
   * @param self - The value to negate.
   */
  negate(self: T): Return;
}
