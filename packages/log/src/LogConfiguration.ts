import type { LogHandler } from './LogHandler.js';

export interface LogConfiguration {
  /**
   * A record of { handlerId: handler }
   */
  handler: Record<string, LogHandler>;
}
