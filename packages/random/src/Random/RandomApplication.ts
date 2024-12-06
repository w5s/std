import { Application } from '@w5s/application';
import type { UUIDString } from '@w5s/core/dist/Type/UUID.js';

interface RandomNumberFunction {
  /**
   * Returns a new random number between 0 and 1
   */
  (): number;
}

interface RandomUUIDFunction {
  /**
   * Return the next UUID (v4)
   */
  (): UUIDString;
}

export interface RandomConfiguration {
  readonly randomUUIDGenerator: RandomUUIDFunction;
  readonly randomNumberGenerator: RandomNumberFunction;
}

/**
 * Random Application
 */
export const RandomApplication = Application<RandomConfiguration>('@w5s/random', {
  randomUUIDGenerator: () => crypto.randomUUID(),
  randomNumberGenerator: () => Math.random(),
});
