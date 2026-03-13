import { useConfiguration } from '@w5s/application';
import { meta } from './meta.js';
import type { LogHandler } from './LogHandler.js';

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
