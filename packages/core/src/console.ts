/* eslint-disable no-console */
import type { Task } from './task.js';

/**
 * A collection of functions to write in stdin (NodeJS) or WebConsole (browser)
 *
 * @namespace
 */
export namespace Console {
  const createLogTask = (
    method: 'debug' | 'log' | 'info' | 'warn' | 'error',
    message: [required: unknown, ...optionalParameters: unknown[]]
  ): Task<void, never> => ({
    taskRun: (resolve) => {
      console[method](...message);

      resolve(undefined);
    },
  });

  /**
   * Display a message in console with `debug` level
   *
   * @example
   * ```typescript
   * unsafeRun(Console.debug('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function debug(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return createLogTask('debug', parameters);
  }

  /**
   * Display a message in console with `log` level
   *
   * @example
   * ```typescript
   * unsafeRun(Console.log('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function log(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return createLogTask('log', parameters);
  }

  /**
   * Display a message in console with `info` level
   *
   * @example
   * ```typescript
   * unsafeRun(Console.info('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function info(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return createLogTask('info', parameters);
  }

  /**
   * Display a message in console with `warn` level
   *
   * @example
   * ```typescript
   * unsafeRun(Console.warn('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function warn(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return createLogTask('warn', parameters);
  }

  /**
   * Display a message in console with `error` level
   *
   * @example
   * ```typescript
   * unsafeRun(Console.error('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function error(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
    return createLogTask('error', parameters);
  }
}
