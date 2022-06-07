/* eslint-disable no-console */
import type { Task } from './task.js';

export namespace Console {
  type Parameters = [required: unknown, ...optionalParameters: unknown[]];

  const createLogTask = (
    method: 'debug' | 'log' | 'info' | 'warn' | 'error',
    message: Parameters
  ): Task<void, never> => ({
    'Task/run': (resolve) => {
      console[method](...message);

      resolve(undefined);
    },
  });

  /**
   * Display a message in console with `debug` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.debug('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function debug(...parameters: Parameters): Task<void, never> {
    return createLogTask('debug', parameters);
  }

  /**
   * Display a message in console with `log` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.log('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function log(...parameters: Parameters): Task<void, never> {
    return createLogTask('log', parameters);
  }

  /**
   * Display a message in console with `info` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.info('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function info(...parameters: Parameters): Task<void, never> {
    return createLogTask('info', parameters);
  }

  /**
   * Display a message in console with `warn` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.warn('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function warn(...parameters: Parameters): Task<void, never> {
    return createLogTask('warn', parameters);
  }

  /**
   * Display a message in console with `error` level
   *
   * @example
   * ```typescript
   * Task.unsafeRun(Console.error('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters - an array of values to be logged
   */
  export function error(...parameters: Parameters): Task<void, never> {
    return createLogTask('error', parameters);
  }
}
