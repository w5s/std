import { useConfiguration } from '@w5s/application';
import { meta } from './meta.js';

interface RandomNumberFunction {
  /**
   * Returns a new random number between 0 and 1
   */
  (): number;
}

export interface Configuration {
  readonly randomNumberGenerator: RandomNumberFunction;
}

/**
 * Random Application
 */
export const configuration = useConfiguration<Configuration>(meta, {
  randomNumberGenerator: () => Math.random(),
});
