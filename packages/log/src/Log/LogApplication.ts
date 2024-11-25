import { Application } from '@w5s/application';
import type { LogHandler } from '../LogHandler.js';

export interface LogConfiguration {
  /**
   * A record of { handlerId: handler }
   */
  handler: Record<string, LogHandler>;
}

/**
 * Log Application reference
 */
export const LogApplication = Application<LogConfiguration>('@w5s/log', {
  handler: {},
});
