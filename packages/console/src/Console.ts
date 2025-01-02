import { debug } from './Console/debug.js';
import { log } from './Console/log.js';
import { info } from './Console/info.js';
import { warn } from './Console/warn.js';
import { error } from './Console/error.js';
import { isWeb } from './Console/isWeb.js';

/**
 * A collection of functions to write in stdin (NodeJS) or WebConsole (browser)
 *
 * @namespace
 */
export const Console = {
  debug,
  log,
  info,
  warn,
  error,
  isWeb,
};
