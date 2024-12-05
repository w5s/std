import { Application } from '@w5s/application';
import type { UUIDGenerator } from '../randomUUID.js';

export interface RandomConfiguration {
  readonly uuidGenerator: UUIDGenerator;
}

/**
 * Random Application
 */
export const RandomApplication = Application<RandomConfiguration>('@w5s/random', {
  uuidGenerator: () => crypto.randomUUID(),
});
