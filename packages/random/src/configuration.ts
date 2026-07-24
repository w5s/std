import { useConfiguration } from '@w5s/application';

import { meta } from './meta.js';

export interface Configuration {
  readonly randomNumberGenerator: RandomNumberFunction;
}

/**
 * Returns a new random number between 0 and 1
 */
type RandomNumberFunction = () => number;

/**
 * Random Application
 */
export const configuration = useConfiguration<Configuration>(meta, {
  randomNumberGenerator: () => Math.random(),
});
