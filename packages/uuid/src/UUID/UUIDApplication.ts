import { Application } from '@w5s/application';
import type { UUIDString } from '@w5s/core/dist/Type/UUID.js';

// eslint-disable-next-line global-require, @typescript-eslint/no-require-imports, unicorn/prefer-module, @typescript-eslint/no-unnecessary-condition
const cryptoModule: Pick<Crypto, 'randomUUID'> = globalThis.crypto ?? require('node:crypto');

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
  randomUUIDGenerator: () => cryptoModule.randomUUID(),
});
