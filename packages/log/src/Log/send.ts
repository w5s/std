import { sendWith } from './sendWith.js';

/**
 * Returns a new logging task with a default empty domain
 */
export const send = sendWith('');
