import { LogApplication } from './Log/LogApplication.js';
import { send } from './Log/send.js';
import { sendWith } from './Log/sendWith.js';

/**
 * Log Application reference
 *
 * @namespace
 */
export const Log = {
  ...LogApplication,
  sendWith,
  send,
};
