/**
 * Generic bound module of value `T`
 */
export interface Bounded<T> {
  /**
   * Minimum value for this type
   *
   * @example
   * ```typescript
   * const anyNumber: number
   * anyNumber > Number.minValue // true
   * ```
   * @category Bound
   */
  readonly minValue: T;
  /**
   * Maximum value for this type
   *
   * @example
   * ```typescript
   * const anyNumber: number
   * anyNumber < Number.maxValue // true
   * ```
   * @category Bound
   */
  readonly maxValue: T;
}
