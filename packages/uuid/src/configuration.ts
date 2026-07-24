import type { UUIDString } from '@w5s/core/dist/Type/UUID.js';

import { useConfiguration } from '@w5s/application';

import { meta } from './meta.js';

export interface Configuration {
  readonly randomUUIDGenerator: RandomUUIDFunction;
}

/**
 * Return the next UUID (v4)
 */
type RandomUUIDFunction = () => UUIDString;

/**
 * Random Application
 */
export const configuration = useConfiguration<Configuration>(meta, {
  randomUUIDGenerator: () => crypto.randomUUID(),
});
