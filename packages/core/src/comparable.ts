export interface Comparable<T> {
  /**
   * Return a number that represents comparison
   */
  readonly compare: (left: T, right: T) => number;
  // '<=': (left: T, right: T) => boolean;
  // '<': (left: T, right: T) => boolean;
  // '>=': (left: T, right: T) => boolean;
  // '>': (left: T, right: T) => boolean;
}
