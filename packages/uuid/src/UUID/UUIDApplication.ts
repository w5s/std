import { Application } from '@w5s/application';
import type { UUIDString } from '@w5s/core/dist/Type/UUID.js';

interface RandomUUIDFunction {
  /**
   * Return the next UUID (v4)
   */
  (): UUIDString;
}

export interface UUIDConfiguration {
  readonly randomUUIDGenerator: RandomUUIDFunction;
}

/**
 * Random Application
 */
export const UUIDApplication = Application<UUIDConfiguration>('@w5s/uuid', {
  randomUUIDGenerator: () => crypto.randomUUID(),
});
