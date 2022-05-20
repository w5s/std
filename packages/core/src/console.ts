/* eslint-disable no-console */
import { Task } from './task.js';

export namespace Console {
  type Parameters = [required: unknown, ...optionalParameters: unknown[]];

  function createTask(method: 'debug' | 'log' | 'info' | 'warn' | 'error', message: Parameters): Task<void, never> {
    return Task(({ ok }) => {
      console[method](...message);

      return ok(undefined);
    });
  }

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
    return createTask('debug', parameters);
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
    return createTask('log', parameters);
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
    return createTask('info', parameters);
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
    return createTask('warn', parameters);
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
    return createTask('error', parameters);
  }
}
