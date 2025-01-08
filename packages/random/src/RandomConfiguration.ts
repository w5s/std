interface RandomNumberFunction {
  /**
   * Returns a new random number between 0 and 1
   */
  (): number;
}

export interface RandomConfiguration {
  readonly randomNumberGenerator: RandomNumberFunction;
}
