import { Application } from '@w5s/application';
import type { UUIDString } from '@w5s/core/dist/Type/UUID.js';
import { randomUUID as randomUUIDNode } from 'node:crypto';

const randomUUID = () => (globalThis.crypto == null ? randomUUIDNode() : globalThis.crypto.randomUUID());

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
export const application = Application<UUIDConfiguration>('@w5s/uuid', {
  randomUUIDGenerator: randomUUID,
});
