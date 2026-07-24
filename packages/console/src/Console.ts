import { debug } from './Console/debug.js';
import { error } from './Console/error.js';
import { info } from './Console/info.js';
import { isWeb } from './Console/isWeb.js';
import { log } from './Console/log.js';
import { warn } from './Console/warn.js';

/**
 * A collection of functions to write in stdin (NodeJS) or WebConsole (browser)
 *
 * @namespace
 */
export const Console = {
  debug,
  error,
  info,
  isWeb,
  log,
  warn,
};
