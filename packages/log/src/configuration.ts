import { useConfiguration } from '@w5s/application';

import type { LogHandler } from './LogHandler.js';

import { meta } from './meta.js';

export interface Configuration {
  /**
   * A record of { handlerId: handler }
   */
  readonly handler: Readonly<Record<string, LogHandler>>;
}

/**
 * Log Application reference
 */
export const configuration = useConfiguration<Configuration>(meta, {
  handler: {},
});
