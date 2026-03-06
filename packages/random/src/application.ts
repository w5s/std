import { Application } from '@w5s/application';
import type { RandomConfiguration } from './RandomConfiguration.js';

/**
 * Random Application
 */
export const application = Application<RandomConfiguration>('@w5s/random', {
  randomNumberGenerator: () => Math.random(),
});
