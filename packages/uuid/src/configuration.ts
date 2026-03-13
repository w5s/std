import { useConfiguration } from '@w5s/application';
import type { UUIDString } from '@w5s/core/dist/Type/UUID.js';
import { randomUUID as randomUUIDNode } from 'node:crypto';
import { meta } from './meta.js';

interface RandomUUIDFunction {
  /**
   * Return the next UUID (v4)
   */
  (): UUIDString;
}

export interface Configuration {
  readonly randomUUIDGenerator: RandomUUIDFunction;
}

/**
 * Random Application
 */
export const configuration = useConfiguration<Configuration>(meta, {
  randomUUIDGenerator: () => (globalThis.crypto == null ? randomUUIDNode() : globalThis.crypto.randomUUID()),
});
