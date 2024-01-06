/**
 * Generic bound module of value `T`
 */
export interface Bounded<T> {
  /**
   * Minimum value for this type
   *
   * @example
   * ```ts
   * const anyNumber: number
   * anyNumber > Number.minValue // true
   * ```
   */
  readonly minValue: T;
  /**
   * Maximum value for this type
   *
   * @example
   * ```ts
   * const anyNumber: number
   * anyNumber < Number.maxValue // true
   * ```
   * ```
   */
  readonly maxValue: T;
}
