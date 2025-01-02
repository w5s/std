import type { Task } from '@w5s/task';
import { write } from './Console/write.js';

/**
 * A collection of functions to write in stdin (NodeJS) or WebConsole (browser)
 *
 * @namespace
 */
export const Console = {
  /**
   * Display a message in console with `debug` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.debug('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  debug(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return write('debug', parameters);
  },

  /**
   * Display a message in console with `log` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.log('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  log(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return write('log', parameters);
  },

  /**
   * Display a message in console with `info` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.info('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  info(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return write('info', parameters);
  },

  /**
   * Display a message in console with `warn` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.warn('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  warn(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return write('warn', parameters);
  },

  /**
   * Display a message in console with `error` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.error('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  error(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return write('error', parameters);
  },
};
