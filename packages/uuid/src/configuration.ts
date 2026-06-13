import type { UUIDString } from '@w5s/core/Type/UUID';

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
