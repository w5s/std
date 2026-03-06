import { Application } from '@w5s/application';
import type { LogConfiguration } from './LogConfiguration.js';

/**
 * Log Application reference
 */
export const application = Application<LogConfiguration>('@w5s/log', {
  handler: {},
});
