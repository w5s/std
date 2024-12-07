import { LogApplication } from './Log/LogApplication.js';
import { sendWith } from './Log/sendWith.js';

/**
 * Log Application reference
 *
 * @namespace
 */
export const Log = {
  ...LogApplication,
  sendWith,
};
